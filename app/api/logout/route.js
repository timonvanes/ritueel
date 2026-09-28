import { AUTH_COOKIE } from "../../../lib/auth";

export async function GET(request) {
  return new Response(null, {
    status: 303,
    headers: {
      Location: new URL("/login", request.url).toString(),
      "Set-Cookie": `${AUTH_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`
    }
  });
}
