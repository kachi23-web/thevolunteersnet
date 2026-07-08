import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_MAX_AGE_SECONDS = 86400; // 24 hours

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect admin routes (except login page and auth API)
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    !pathname.startsWith("/api/auth")
  ) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    // Requirement 1.1: Redirect if no valid token
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Requirement 1.5: Invalidate session if it exceeds 24 hours since creation
    const issuedAt = token.iat as number | undefined;
    if (issuedAt) {
      const now = Math.floor(Date.now() / 1000);
      if (now - issuedAt >= SESSION_MAX_AGE_SECONDS) {
        const loginUrl = new URL("/admin/login", request.url);
        const response = NextResponse.redirect(loginUrl);

        // Invalidate the session cookie by setting it to expire immediately
        response.cookies.set("next-auth.session-token", "", { maxAge: 0 });
        response.cookies.set("__Secure-next-auth.session-token", "", {
          maxAge: 0,
        });

        return response;
      }
    }

    // Requirement 1.4: Allow authenticated requests with valid session through
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
