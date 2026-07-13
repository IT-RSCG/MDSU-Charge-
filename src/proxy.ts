import { auth } from "@/server/auth";
import { NextResponse } from "next/server";
import { ROUTES } from "@/config/app";

// export const proxy = auth((req) => {
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;
  const role = session?.user?.role;

  if (!session) {
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/faculty") ||
      pathname.startsWith("/cms") ||
      pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL(ROUTES.login, req.url));
    }
    return NextResponse.next();
  }

  if (session.user.isActive === false) {
    return NextResponse.redirect(
      new URL(ROUTES.login + "?error=deactivated", req.url),
    );
  }

  if (!session.user.emailVerified) {
    return NextResponse.redirect(
      new URL(ROUTES.login + "?error=unverified", req.url),
    );
  }

  if (role === "ADMIN") return NextResponse.next();

  if (role === "STUDENT") {
    if (
      pathname.startsWith("/faculty") ||
      pathname.startsWith("/cms") ||
      pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL(ROUTES.dashboard, req.url));
    }
    return NextResponse.next();
  }

  if (role === "FACULTY") {
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/cms") ||
      pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL(ROUTES.faculty, req.url));
    }
    return NextResponse.next();
  }

  if (role === "CMS_EDITOR") {
    if (
      pathname.startsWith("/dashboard") ||
      pathname.startsWith("/faculty") ||
      pathname.startsWith("/admin")
    ) {
      return NextResponse.redirect(new URL(ROUTES.cms, req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/faculty/:path*",
    "/cms/:path*",
    "/admin/:path*",
  ],
};
