import { NextResponse, type NextRequest } from "next/server";
import Session from "./lib/session";
import { updateSession } from "./lib/supabase/middleware";

const PUBLIC_PATHS = ["/register", "/login", "/reset-password"];

export async function middleware(request: NextRequest) {
  const session = await Session.fromRequest(request);
  console.log("middleware_ironSession", session);
  console.log("middleware_activated");
  const { response, user } = await updateSession(request);

  const url = request.nextUrl.clone(); // Clone the request URL for potential modifications
  const isPublicPath = PUBLIC_PATHS.includes(url.pathname);

  if (user ?? session.address) {
    // User is authenticated
    console.log("Authenticated", user?.email ?? "NO EMAIL FOUND");
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

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|siwe).*)"],
};
