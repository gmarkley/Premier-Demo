import { NextResponse } from "next/server";
import { CRM_COOKIE, CRM_MAX_AGE, crmPasswordOk, signCrmCookie } from "../../../../lib/crm-auth";

export async function POST(request: Request) {
  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = String(body.password || "");
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!crmPasswordOk(password)) {
    return NextResponse.json({ error: "Those credentials did not match." }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: CRM_COOKIE,
    value: signCrmCookie(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: CRM_MAX_AGE,
  });
  return res;
}
