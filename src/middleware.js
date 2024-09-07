// export { auth as middleware } from "@/lib/authentication/auth";
import { NextResponse } from "next/server";
import {
  protectedRoutes,
  unprotectedRoutes,
} from "@/lib/authentication/auth_routes";
import { auth } from "@/lib/authentication/auth";

export default async function middleware(request) {
  // const session = await auth();
  // const isProtectedRoute = protectedRoutes.some((prefix) =>
  //   request.nextUrl.pathname.startsWith(prefix)
  // );
  // // Not Logged in -> Redirect to login for protected routes
  // if (!session && isProtectedRoute) {
  //   const absoluteURL = new URL("/login", request.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }
  // // Logged in -> Redirect the login requests to dashboard
  // if (session && request.nextUrl.pathname === "/login") {
  //   console.log("=== redirecting");
  //   const absoluteURL = new URL("/dashboard", request.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }
}
