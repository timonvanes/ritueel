import { NextResponse } from "next/server";

export function middleware(request) {
  const user = process.env.AUTH_USER;
  const pass = process.env.AUTH_PASS;

  if (!user || !pass) return NextResponse.next();

  const header = request.headers.get("authorization");
  if (header) {
    const [scheme, encoded] = header.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = Buffer.from(encoded, "base64").toString("utf-8");
      const sep = decoded.indexOf(":");
      const gotUser = decoded.slice(0, sep);
      const gotPass = decoded.slice(sep + 1);
      if (gotUser === user && gotPass === pass) {
        return NextResponse.next();
      }
    }
  }

  return new NextResponse("Authenticatie vereist", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Huid & Haar Ritueel"' }
  });
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)"
};
