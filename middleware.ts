import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes
const publicRoutes = ["/", "/api/webhook", "/sign-in(.*)"];
const isPublicRoute = createRouteMatcher(publicRoutes);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  
  // Allow access to public routes
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }
  
  // Redirect to sign-in if not authenticated and not already on sign-in page
  if (!userId && !req.nextUrl.pathname.startsWith('/sign-in')) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};