import { NextResponse } from 'next/server';

const GHL_BASE = 'https://services.leadconnectorhq.com';
const API_VERSION = '2021-07-28';

function ghlHeaders(apiKey: string): HeadersInit {
  return {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
    Version: API_VERSION,
  };
}

function extractContactId(data: Record<string, unknown>): string | undefined {
  const contact = data.contact as Record<string, unknown> | undefined;
  if (contact && typeof contact.id === 'string') return contact.id;
  if (typeof data.id === 'string') return data.id;
  if (typeof data.contactId === 'string') return data.contactId;
  return undefined;
}

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

function parseBody(raw: unknown): ContactPayload | { error: string; status: number } {
  const body = raw as Record<string, unknown>;
  const name = typeof body.name === 'string' ? body.name : '';
  const email = typeof body.email === 'string' ? body.email : '';
  const phone = typeof body.phone === 'string' ? body.phone : '';
  const message = typeof body.message === 'string' ? body.message : '';

  if (!name.trim() || !email.trim() || !message.trim()) {
    return { error: 'Name, email, and event details are required.', status: 400 };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { error: 'Please enter a valid email address.', status: 400 };
  }

  return {
    name: name.trim().slice(0, 200),
    email: email.trim().toLowerCase().slice(0, 200),
    phone: phone.trim().slice(0, 40),
    message: message.trim().slice(0, 20000),
  };
}

/** Workflow Inbound Webhook — no REST “contacts” scope required. Map fields in the workflow to Create/Update Contact. */
async function sendViaWebhook(webhookUrl: string, payload: ContactPayload) {
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || undefined,
      message: payload.message,
      source: 'Premier Entertainment – contact form',
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('[GHL] Webhook failed', res.status, text.slice(0, 500));
    return false;
  }
  return true;
}

async function sendViaRestApi(
  apiKey: string,
  locationId: string,
  payload: ContactPayload
): Promise<boolean> {
  const headers = ghlHeaders(apiKey);

  const contactPayload: Record<string, unknown> = {
    locationId,
    name: payload.name,
    email: payload.email,
    source: 'Premier Entertainment – contact form',
    tags: ['website-contact'],
  };

  if (payload.phone) {
    contactPayload.phone = payload.phone;
  }

  const createRes = await fetch(`${GHL_BASE}/contacts/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(contactPayload),
  });

  const createData = (await createRes.json().catch(() => ({}))) as Record<string, unknown>;

  if (!createRes.ok) {
    console.error('[GHL] Create contact failed', createRes.status, createData);
    return false;
  }

  const contactId = extractContactId(createData);

  if (contactId && payload.message) {
    const noteRes = await fetch(`${GHL_BASE}/contacts/${contactId}/notes`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        body: `Contact form — event details:\n\n${payload.message}`,
      }),
    });

    if (!noteRes.ok) {
      const noteData = await noteRes.json().catch(() => ({}));
      console.error('[GHL] Add note failed', noteRes.status, noteData);
    }
  }

  return true;
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GHL_WEBHOOK_URL?.trim();
  const apiKey = process.env.GHL_API_KEY?.trim();
  const locationId = process.env.GHL_LOCATION_ID?.trim();

  if (!webhookUrl && (!apiKey || !locationId)) {
    return NextResponse.json(
      {
        error:
          'Contact form is not configured. Set GHL_WEBHOOK_URL (recommended) or GHL_API_KEY + GHL_LOCATION_ID in .env.local.',
      },
      { status: 503 }
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = parseBody(raw);
  if ('error' in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }

  if (webhookUrl) {
    if (!webhookUrl.startsWith('https://')) {
      return NextResponse.json({ error: 'Webhook URL must use https.' }, { status: 500 });
    }
    const ok = await sendViaWebhook(webhookUrl, parsed);
    if (!ok) {
      return NextResponse.json(
        { error: 'Unable to submit right now. Please try again in a moment.' },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  }

  const ok = await sendViaRestApi(apiKey!, locationId!, parsed);
  if (!ok) {
    return NextResponse.json(
      { error: 'Unable to submit right now. Please try again in a moment.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
