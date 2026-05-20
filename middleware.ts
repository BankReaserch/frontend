import {
  NextRequest,
  NextResponse,
} from "next/server";

export function middleware(
  request: NextRequest
) {

  const token =
    request.cookies.get(
      "token"
    )?.value;

  const pathname =
    request.nextUrl.pathname;

  // PROTECT ADMIN ROUTES
  if (
    pathname.startsWith(
      "/admin"
    )
  ) {

    // NO TOKEN
    if (!token) {

      return NextResponse.redirect(
        new URL(
          "/login",
          request.url
        )
      );
    }
  }

  return NextResponse.next();
}

// ROUTES
export const config = {
  matcher: [
    "/admin/:path*",
  ],
};