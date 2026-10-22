"""Checks Google and Apple id tokens before the API trusts the email inside them."""
from __future__ import annotations

import json
import time
import urllib.request
from dataclasses import dataclass
from typing import Any, Callable, Dict, List, Optional

from jose import jwt
from jose.exceptions import JOSEError

from backend.app.core.config import settings


GOOGLE_KEYS_URL = "https://www.googleapis.com/oauth2/v3/certs"
GOOGLE_ISSUERS = ("https://accounts.google.com", "accounts.google.com")
APPLE_KEYS_URL = "https://appleid.apple.com/auth/keys"
APPLE_ISSUER = "https://appleid.apple.com"
KEYS_TTL_SECONDS = 60 * 60


class SocialTokenError(Exception):
    pass


@dataclass
class VerifiedIdentity:
    provider: str
    subject: str
    email: str


def _fetch_keys(url: str) -> List[Dict[str, Any]]:
    with urllib.request.urlopen(url, timeout=10) as response:
        return json.load(response)["keys"]


# Tests swap this for a function that returns their own keys.
fetch_keys: Callable[[str], List[Dict[str, Any]]] = _fetch_keys
_key_cache: Dict[str, tuple] = {}


def _signing_key(url: str, kid: Optional[str]) -> Dict[str, Any]:
    cached = _key_cache.get(url)
    keys = cached[1] if cached and time.time() - cached[0] < KEYS_TTL_SECONDS else None
    # A kid we have not seen means the provider rotated its keys: fetch again once.
    if keys is None or not any(key.get("kid") == kid for key in keys):
        keys = fetch_keys(url)
        _key_cache[url] = (time.time(), keys)
    for key in keys:
        if key.get("kid") == kid:
            return key
    raise SocialTokenError("Unknown signing key.")


def _decode(token: str, keys_url: str, audiences: List[str], issuers: tuple) -> Dict[str, Any]:
    try:
        header = jwt.get_unverified_header(token)
        key = _signing_key(keys_url, header.get("kid"))
        claims = jwt.decode(token, key, algorithms=[key.get("alg", "RS256")], options={"verify_aud": False, "verify_at_hash": False})
    except (JOSEError, KeyError, ValueError) as error:
        raise SocialTokenError("The sign-in token is not valid.") from error
    except OSError as error:
        raise SocialTokenError("Could not reach the sign-in provider.") from error

    audience = claims.get("aud")
    audience_list = audience if isinstance(audience, list) else [audience]
    if not any(value in audiences for value in audience_list):
        raise SocialTokenError("The sign-in token is for another app.")
    if claims.get("iss") not in issuers:
        raise SocialTokenError("The sign-in token has the wrong issuer.")
    return claims


def _email_verified(claims: Dict[str, Any]) -> bool:
    # Apple sends "true" as a string in older tokens.
    return claims.get("email_verified") in (True, "true")


def verify_id_token(provider: str, token: str) -> VerifiedIdentity:
    if provider == "google":
        audiences, keys_url, issuers = settings.google_client_ids, GOOGLE_KEYS_URL, GOOGLE_ISSUERS
    elif provider == "apple":
        audiences, keys_url, issuers = settings.apple_client_ids, APPLE_KEYS_URL, (APPLE_ISSUER,)
    else:
        raise SocialTokenError("That sign-in provider is not supported.")

    if not audiences:
        raise SocialTokenError("That sign-in provider is not set up on the server.")

    claims = _decode(token, keys_url, audiences, issuers)
    email = str(claims.get("email") or "").strip().lower()
    if not claims.get("sub") or not email or not _email_verified(claims):
        raise SocialTokenError("The sign-in token has no verified email.")
    return VerifiedIdentity(provider=provider, subject=str(claims["sub"]), email=email)


def is_provider_configured(provider: str) -> bool:
    return bool(settings.google_client_ids if provider == "google" else settings.apple_client_ids if provider == "apple" else [])
