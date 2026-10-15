import { NextResponse } from "next/server";
import { createContact } from "../../../lib/contacts";

const NOTIFY_EMAIL = "vip@premierentertainment.events";
const FROM_EMAIL =
  process.env.FROM_EMAIL?.trim() ||
  "Premier Entertainment <hello@premieradvertisement.com>";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

function escHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function parseBody(raw: unknown): ContactPayload | { error: string; status: number } {
  const body = raw as Record<string, unknown>;
  const name = typeof body.name === "string" ? body.name : "";
  const email = typeof body.email === "string" ? body.email : "";
  const phone = typeof body.phone === "string" ? body.phone : "";
  const message = typeof body.message === "string" ? body.message : "";

  if (!name.trim() || !email.trim() || !message.trim()) {
    return { error: "Name, email, and event details are required.", status: 400 };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { error: "Please enter a valid email address.", status: 400 };
  }

  return {
    name: name.trim().slice(0, 200),
    email: email.trim().toLowerCase().slice(0, 200),
    phone: phone.trim().slice(0, 40),
    message: message.trim().slice(0, 20000),
  };
}

async function sendViaResend(payload: ContactPayload) {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return false;

  const html =
    `<div style="font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;line-height:1.6">` +
    `<h2 style="margin:0 0 12px">New Premier Entertainment inquiry</h2>` +
    `<table cellpadding="4" style="border-collapse:collapse">` +
    `<tr><td><strong>Name</strong></td><td>${escHtml(payload.name)}</td></tr>` +
    `<tr><td><strong>Email</strong></td><td>${escHtml(payload.email)}</td></tr>` +
    `<tr><td><strong>Phone</strong></td><td>${escHtml(payload.phone || "—")}</td></tr>` +
    `</table>` +
    `<p style="margin-top:12px;white-space:pre-wrap">${escHtml(payload.message)}</p>` +
    `<p style="margin-top:16px;font-size:13px;color:#555">Saved in the contact CRM at /crm</p>` +
    `</div>`;

  const text =
    `New Premier Entertainment inquiry\n\n` +
    `Name: ${payload.name}\n` +
    `Email: ${payload.email}\n` +
    `Phone: ${payload.phone || "—"}\n\n` +
    `${payload.message}\n`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + key,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      reply_to: payload.email,
      subject: `New inquiry: ${payload.name}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error("[Resend] Contact notify failed", res.status, errText.slice(0, 500));
    return false;
  }
  return true;
}

export async function POST(request: Request) {
  if (!process.env.DATABASE_URL?.trim()) {
    return NextResponse.json(
      { error: "Contact CRM is not configured (DATABASE_URL)." },
      { status: 503 },
    );
  }
  if (!process.env.RESEND_API_KEY?.trim()) {
    return NextResponse.json(
      {
        error:
          "Contact form is not configured. Set RESEND_API_KEY so inquiries go to vip@premierentertainment.events.",
      },
      { status: 503 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = parseBody(raw);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }

  try {
    await createContact(parsed);
  } catch (err) {
    console.error("[CRM] Save contact failed", err);
    return NextResponse.json(
      { error: "Unable to submit right now. Please try again in a moment." },
      { status: 502 },
    );
  }

  const emailed = await sendViaResend(parsed);
  if (!emailed) {
    return NextResponse.json(
      { error: "Unable to submit right now. Please try again in a moment." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
