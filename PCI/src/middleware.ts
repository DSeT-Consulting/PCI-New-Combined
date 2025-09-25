import { type NextRequest, NextResponse } from 'next/server';

// Define public paths that don't require authentication
const publicPaths = ['/login', '/api/auth/login'];

// Define valid routes to check against
const validRoutes = [
  '/',
  '/login',
  '/dashboard',
  '/about',
  '/athletes',
  '/classification',
  '/join',
  '/committee-members',
  '/contact',
  '/events',
  '/sports',
  '/gallery',
  '/latest-updates',
  '/news',
  '/partners',
  '/wpa-new-delhi-2025',
];

function isValidRoute(pathname: string): boolean {
  // Check if exact match
  if (validRoutes.includes(pathname)) return true;

  // Check for dynamic routes
  if (pathname.startsWith('/athletes/') && pathname.split('/').length === 3) return true;
  if (pathname.startsWith('/news/') && pathname.split('/').length === 3) return true;
  if (pathname.startsWith('/wpa-new-delhi-2025/')) return true;
  if (pathname.match(/^\/\w+\/home-controls$/)) return true;
  if (pathname.match(/^\/\w+\/tags-management$/)) return true;
  if (pathname.match(/^\/\w+\/news-management$/)) return true;

  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is public
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Handle 404 cases for invalid routes
  if (!isValidRoute(pathname)) {
    const navigationType = request.headers.get('x-navigation-type');

    // If it's a manual URL entry (no referrer or direct access), redirect to home
    const referer = request.headers.get('referer');
    const userAgent = request.headers.get('user-agent');

    // Check if it's likely a direct URL entry
    if (!referer?.includes(request.nextUrl.origin)) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // For link clicks, let Next.js handle it normally (will show 404 page)
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