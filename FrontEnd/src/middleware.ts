import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/recettes",
  "/calendrier",
  "/decouvrir",
  "/profil",
  "/parametres",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("nutriflow_access_token")?.value;
  const isOnboardingRoute = pathname.startsWith("/onboarding");
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isOnboardingRoute) {
    return NextResponse.next();
  }

  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if ((pathname.startsWith("/login") || pathname.startsWith("/register")) && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/recettes/:path*",
    "/calendrier/:path*",
    "/decouvrir/:path*",
    "/profil/:path*",
    "/parametres/:path*",
    "/onboarding/:path*",
    "/login",
    "/register",
  ],
};
