import { NextResponse } from "next/server";
import { AUTH_COOKIE, authConfigured, verifySessionCookie } from "./lib/auth";

const PUBLIC_PATHS = ["/login", "/api/login", "/api/logout"];

export async function middleware(request) {
  if (!authConfigured()) return NextResponse.next();

  const { pathname } = request.nextUrl;
  if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

  const cookie = request.cookies.get(AUTH_COOKIE)?.value;
  const ok = await verifySessionCookie(cookie);
  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon|icon|apple-touch-icon|manifest).*)"
};
