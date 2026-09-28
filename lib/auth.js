export const AUTH_COOKIE = "ritueel_session";

async function hmac(key, message) {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Derives a stable, non-reversible session token from the configured
// credentials so no server-side session store is needed: the cookie proves
// knowledge of AUTH_PASS without carrying the password itself.
export async function sessionToken(user, pass) {
  return hmac(pass, `ritueel-session:${user}`);
}

export function authConfigured() {
  return Boolean(process.env.AUTH_USER && process.env.AUTH_PASS);
}

export async function verifyCredentials(user, pass) {
  return (
    authConfigured() &&
    user === process.env.AUTH_USER &&
    pass === process.env.AUTH_PASS
  );
}

export async function verifySessionCookie(value) {
  if (!authConfigured() || !value) return false;
  const expected = await sessionToken(process.env.AUTH_USER, process.env.AUTH_PASS);
  return value === expected;
}
