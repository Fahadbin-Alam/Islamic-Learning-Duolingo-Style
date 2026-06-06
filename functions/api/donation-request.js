export async function onRequestPost(context) {
  let payload;

  try {
    payload = await context.request.json();
  } catch (_error) {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const required = ["donor_name", "donor_email", "amount_usd", "campaign"];
  const missing = required.filter((key) => !payload[key]);

  if (missing.length > 0) {
    return json({ error: `Missing required fields: ${missing.join(", ")}` }, 400);
  }

  const amount = Number(payload.amount_usd);
  if (!Number.isFinite(amount) || amount <= 0) {
    return json({ error: "Donation amount must be greater than zero" }, 400);
  }

  const donation = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    donor_name: String(payload.donor_name).trim(),
    donor_email: String(payload.donor_email).trim().toLowerCase(),
    amount_usd: amount,
    campaign: String(payload.campaign).trim(),
    schedule: String(payload.schedule || "One-time donation").trim(),
    payment_method: String(payload.payment_method || "Cloudflare donation request").trim(),
    note: String(payload.note || "").trim(),
    anonymous: Boolean(payload.anonymous),
    status: "requested",
  };

  if (context.env.ONE_WORLD_RELIEF_DONATIONS) {
    await context.env.ONE_WORLD_RELIEF_DONATIONS.put(
      `donation:${donation.created_at}:${donation.id}`,
      JSON.stringify(donation)
    );
  }

  return json({
    ok: true,
    donation_id: donation.id,
    message: "Donation request received by Cloudflare.",
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(),
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
