/* eslint-disable @typescript-eslint/require-await */
import { NextResponse, type NextRequest } from "next/server";
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from "next-firebase-auth-edge";
import { authConfig } from "./app/lib/firebase/server";

const PUBLIC_PATHS = ["/register", "/login", "/reset-password"];

export function middleware(request: NextRequest) {
  console.log("middleware activated");
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: authConfig.apiKey,
    cookieName: authConfig.cookieName,
    cookieSerializeOptions: authConfig.cookieSerializeOptions,
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
    serviceAccount: authConfig.serviceAccount,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handleValidToken: async ({ token, decodedToken }, headers) => {
      console.log("Authenticated!");
      // Authenticated user should not be able to access /login, /register and /reset-password routes

      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request);
      }

      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    handleInvalidToken: async () => {
      console.error("Unauthenticated");
      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });
      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  matcher: [
    "/api/login",
    "/api/logout",
    "/",
    "/((?!_next|favicon.ico|api|.*\\.).*)",
  ],
};
