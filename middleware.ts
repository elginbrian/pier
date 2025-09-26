import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard"];

const authPaths = ["/auth"];

function isProtected(pathname: string) {
  return protectedPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

function isAuthPage(pathname: string) {
  return authPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/public") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get("pier_user");
  let parsed: { uid?: string; role?: string } | null = null;
  if (cookie) {
    try {
      parsed = JSON.parse(cookie.value);
    } catch (e) {
      parsed = null;
    }
  }

  const isAuthed = Boolean(parsed && parsed.uid);

  if (isProtected(pathname) && !isAuthed) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }
  if (isAuthPage(pathname) && isAuthed) {
    const role = parsed?.role ?? "vendor";
    const dest = role === "hukum" ? "/dashboard/hukum" : role === "manajemen" || role === "management" ? "/dashboard/management" : "/dashboard/vendor";
    return NextResponse.redirect(new URL(dest, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/dashboard"],
};
