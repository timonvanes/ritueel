import { AUTH_COOKIE, verifyCredentials, sessionToken } from "../../../lib/auth";

export async function POST(request) {
  const form = await request.formData();
  const user = String(form.get("user") || "");
  const pass = String(form.get("pass") || "");

  const ok = await verifyCredentials(user, pass);
  if (!ok) {
    return new Response(null, {
      status: 303,
      headers: { Location: new URL("/login?error=1", request.url).toString() }
    });
  }

  const token = await sessionToken(user, pass);
  return new Response(null, {
    status: 303,
    headers: {
      Location: new URL("/", request.url).toString(),
      "Set-Cookie": `${AUTH_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 180}`
    }
  });
}
