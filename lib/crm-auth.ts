import { createHmac, timingSafeEqual } from "crypto";

export const CRM_COOKIE = "pe_crm";
export const CRM_MAX_AGE = 60 * 60 * 24 * 7;

function secret() {
  const value =
    process.env.CRM_SECRET?.trim() || process.env.SESSION_SECRET?.trim() || "";
  if (value.length < 16) {
    throw new Error("CRM_SECRET must be set (at least 16 characters).");
  }
  return value;
}

export function crmPasswordOk(input: string) {
  const expected = process.env.CRM_PASSWORD || "";
  if (!expected || !input) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function signCrmCookie() {
  const password = process.env.CRM_PASSWORD || "";
  return createHmac("sha256", secret())
    .update("pe-crm-v1:" + password)
    .digest("hex");
}

export function crmCookieValid(token: string | undefined | null) {
  if (!token) return false;
  try {
    const expected = signCrmCookie();
    const a = Buffer.from(token);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
