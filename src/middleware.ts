import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If user is trying to access /admin but isn't an admin, redirect to home
    if (
      req.nextUrl.pathname.startsWith('/admin') &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Only require auth for the following routes
        const ProtectedPaths = [
          "/typing",
          "/typing-test",
          "/tutor",
          "/converter",
          "/keyboard",
          "/admin"
        ];
        
        const isPathProtected = ProtectedPaths.some((path) =>
          req.nextUrl.pathname.startsWith(path)
        );

        if (isPathProtected) {
          return !!token;
        }
        
        // Let everything else be public (Home, auth pages, etc)
        return true;
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

export const config = {
  matcher: [
    "/typing/:path*", 
    "/typing-test/:path*", 
    "/tutor/:path*", 
    "/converter/:path*", 
    "/keyboard/:path*",
    "/admin/:path*"
  ],
};
