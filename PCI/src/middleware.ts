import { type NextRequest, NextResponse } from 'next/server';

// Define public paths that don't require authentication
const publicPaths = ['/login', '/api/auth/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is public
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check if user is authenticated via the auth cookie
  const authCookie = request.cookies.get('auth-token');

  // TEMPORARILY DISABLED: Login redirect for public website access
  // To re-enable: uncomment the lines below
  // If no auth cookie is present and route is not public, redirect to login
  // if (!authCookie && !publicPaths.includes(pathname)) {
  //   const url = new URL('/login', request.url);
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

// Optionally configure middleware to only run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};