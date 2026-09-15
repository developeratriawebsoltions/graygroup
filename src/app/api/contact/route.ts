import { NextResponse } from "next/server";

const INTERESTS = [
  "buying",
  "selling",
  "investing",
  "relocating",
  "other",
] as const;

interface ContactPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  property?: string;
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/**
 * Contact enquiry endpoint.
 *
 * Validates and acknowledges the submission. Delivery is intentionally left to
 * an outbound provider (Resend, Postmark, SES) — plug it in where marked below
 * and the rest of the pipeline needs no changes.
 */
export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request body." },
      { status: 400 },
    );
  }

  const errors: Record<string, string> = {};

  const firstName = payload.firstName?.trim() ?? "";
  const lastName = payload.lastName?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const phone = payload.phone?.trim() ?? "";
  const interest = payload.interest?.trim().toLowerCase() ?? "";
  const message = payload.message?.trim() ?? "";

  if (firstName.length < 2) errors.firstName = "Please enter your first name.";
  if (lastName.length < 2) errors.lastName = "Please enter your last name.";
  if (!isEmail(email)) errors.email = "Please enter a valid email address.";
  if (phone && phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!INTERESTS.includes(interest as (typeof INTERESTS)[number])) {
    errors.interest = "Please select what you are interested in.";
  }
  if (message.length < 10) {
    errors.message = "Please tell us a little more (10 characters minimum).";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // --- Outbound delivery -------------------------------------------------
  // Replace with a real provider call, e.g.
  //   await resend.emails.send({ from, to: "chris@graygrouprealty.com", ... })
  console.info("[contact] new enquiry", {
    name: `${firstName} ${lastName}`,
    email,
    phone: phone || "—",
    interest,
    property: payload.property || "—",
    receivedAt: new Date().toISOString(),
  });
  // -----------------------------------------------------------------------

  return NextResponse.json({
    ok: true,
    message:
      "Thank you — your enquiry has reached the team. We reply within one business day.",
  });
}
