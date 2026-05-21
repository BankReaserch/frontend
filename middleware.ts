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

  /*
    ADMIN ROUTES
  */
  if (
    pathname.startsWith(
      "/admin"
    )
  ) {

    if (!token) {

      return NextResponse.redirect(
        new URL(
          "/login",
          request.url
        )
      );
    }
  }

  /*
    USER DASHBOARD ROUTES
  */
  if (
    pathname.startsWith(
      "/dashboard"
    )
  ) {

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

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
  ],
};