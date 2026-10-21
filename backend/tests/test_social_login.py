from __future__ import annotations

import time
import uuid

import pytest
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from jose import jwk, jwt

from backend.app.core import social_tokens
from backend.app.core.config import settings


GOOGLE_CLIENT_ID = "1234-web.apps.googleusercontent.com"
USER = {"totalXp": 15, "streakDays": 1, "hearts": {"current": 5, "max": 5, "unlimited": False}}

_private = rsa.generate_private_key(public_exponent=65537, key_size=2048)
PRIVATE_PEM = _private.private_bytes(serialization.Encoding.PEM, serialization.PrivateFormat.PKCS8, serialization.NoEncryption()).decode()
PUBLIC_JWK = {
    **jwk.construct(_private.public_key().public_bytes(serialization.Encoding.PEM, serialization.PublicFormat.SubjectPublicKeyInfo).decode(), "RS256").to_dict(),
    "kid": "test-key",
    "alg": "RS256",
    "use": "sig",
}


@pytest.fixture(autouse=True)
def provider_keys(monkeypatch):
    monkeypatch.setattr(settings, "google_client_ids_raw", GOOGLE_CLIENT_ID)
    monkeypatch.setattr(settings, "apple_client_ids_raw", "com.islamiclearning.muslimo")
    monkeypatch.setattr(social_tokens, "fetch_keys", lambda url: [PUBLIC_JWK])
    social_tokens._key_cache.clear()


def make_token(*, sub=None, email=None, aud=GOOGLE_CLIENT_ID, iss="https://accounts.google.com", verified=True, expires_in=600, key=PRIVATE_PEM):
    now = int(time.time())
    claims = {
        "iss": iss,
        "aud": aud,
        "sub": sub or uuid.uuid4().hex,
        "email": email or f"g-{uuid.uuid4().hex[:8]}@gmail.com",
        "email_verified": verified,
        "iat": now,
        "exp": now + expires_in,
    }
    return jwt.encode(claims, key, algorithm="RS256", headers={"kid": "test-key"}), claims


def social(client, token, provider="google", **extra):
    return client.post("/api/auth/social", json={"provider": provider, "idToken": token, "user": USER, **extra})


def test_google_sign_in_creates_an_account_then_logs_back_in(client):
    token, claims = make_token()

    first = social(client, token, name="Amina Khan")
    assert first.status_code == 200, first.text
    body = first.json()
    assert body["token"]
    assert body["account"]["email"] == claims["email"]
    assert body["account"]["name"] == "Amina Khan"
    assert body["account"]["provider"] == "google"
    assert body["user"]["totalXp"] == 15

    # Same Google account again: the same account, not a second one.
    again, _ = make_token(sub=claims["sub"], email=claims["email"])
    second = social(client, again, name="Someone Else")
    assert second.status_code == 200
    assert second.json()["account"]["name"] == "Amina Khan"
    assert second.json()["account"]["createdAt"] == body["account"]["createdAt"]


def test_log_in_mode_does_not_create_an_account(client):
    token, _ = make_token()
    response = social(client, token, allowCreate=False)
    assert response.status_code == 404


def test_google_joins_a_password_account_with_the_same_email(client):
    email = f"pw-{uuid.uuid4().hex[:8]}@gmail.com"
    registered = client.post("/api/auth/register", json={"name": "Yusuf", "email": email, "password": "long-enough-1", "user": USER})
    assert registered.status_code == 201

    token, _ = make_token(email=email)
    response = social(client, token, allowCreate=False)
    assert response.status_code == 200
    assert response.json()["account"]["name"] == "Yusuf"
    # The password still works too.
    assert client.post("/api/auth/login", json={"email": email, "password": "long-enough-1"}).status_code == 200


@pytest.mark.parametrize(
    "overrides",
    [
        {"aud": "another-app.apps.googleusercontent.com"},
        {"iss": "https://evil.example.com"},
        {"verified": False},
        {"expires_in": -60},
    ],
)
def test_bad_google_tokens_are_refused(client, overrides):
    token, _ = make_token(**overrides)
    assert social(client, token).status_code == 401


def test_token_signed_by_another_key_is_refused(client):
    other = rsa.generate_private_key(public_exponent=65537, key_size=2048)
    other_pem = other.private_bytes(serialization.Encoding.PEM, serialization.PrivateFormat.PKCS8, serialization.NoEncryption()).decode()
    token, _ = make_token(key=other_pem)
    assert social(client, token).status_code == 401


def test_google_is_off_until_a_client_id_is_set(client, monkeypatch):
    monkeypatch.setattr(settings, "google_client_ids_raw", "")
    token, _ = make_token()
    assert social(client, token).status_code == 401


def test_apple_sign_in_uses_the_bundle_id(client):
    token, claims = make_token(aud="com.islamiclearning.muslimo", iss="https://appleid.apple.com", email=f"{uuid.uuid4().hex[:8]}@privaterelay.appleid.com")
    response = social(client, token, provider="apple")
    assert response.status_code == 200, response.text
    assert response.json()["account"]["provider"] == "apple"
    # No name from Apple: the account starts with the part before the @.
    assert response.json()["account"]["name"] == claims["email"].split("@")[0]

    google_audience, _ = make_token(iss="https://appleid.apple.com")
    assert social(client, google_audience, provider="apple").status_code == 401


def test_two_people_with_the_same_email_start_get_different_usernames(client):
    first, _ = make_token(email=f"same-{uuid.uuid4().hex[:6]}@gmail.com")
    email = social(client, first).json()["account"]["email"]
    other_domain = email.replace("gmail.com", "example.org")
    second, _ = make_token(email=other_domain)
    assert social(client, second).status_code == 200
