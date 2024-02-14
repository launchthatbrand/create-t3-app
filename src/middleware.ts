/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */

import { NextResponse, type NextRequest } from "next/server";
import Session from "./lib/session";

const PUBLIC_PATHS = ["/register", "/login", "/reset-password", "/siwe"];

export const middleware = async (request: NextRequest) => {
  const path = request.nextUrl.pathname;
  console.log("middleware_activated", path);
  const session = await Session.fromRequest(request);

  const url = request.nextUrl.clone(); // Clone the request URL for potential modifications
  const isPublicPath = PUBLIC_PATHS.includes(url.pathname);

  if (session.address) {
    // User is authenticated
    console.log("Authenticated");
    if (isPublicPath) {
      // Redirect authenticated users away from public paths to the home page
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  } else {
    // User is not authenticated
    console.log("Unauthenticated");
    if (!isPublicPath) {
      // Redirect unauthenticated users trying to access protected routes to the login page
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
