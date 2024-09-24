// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix } from './navigation';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Create next-intl middleware
const intlMiddleware = createMiddleware({
  defaultLocale: 'id',
  localeDetection: false,
  localePrefix,
  locales
});

export async function middleware(request: NextRequest) {
  // Manually extract the locale from the pathname
  const pathname = request.nextUrl.pathname;
  const localeMatch = pathname.match(/^\/(en|id)/);
  const locale = localeMatch ? localeMatch[1] : 'id'; // Default to 'id' if no match

  // Apply the next-intl middleware
  const intlResponse = intlMiddleware(request);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Block access to /login for authenticated users
  if (pathname === `/${locale}/login` && token) {
    // Redirect authenticated users trying to access login to the dashboard
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  // Check if NextAuth middleware should run (for protected routes)
  const isProtectedRoute =
    pathname.startsWith(`/${locale}/dashboard`) ||
    pathname.startsWith(`/${locale}/signing`);

  if (isProtectedRoute) {
    if (!token) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  // Continue processing the response from intlMiddleware
  return intlResponse || NextResponse.next();
}

// Combine matcher rules for both middlewares
export const config = {
  matcher: [
    '/',
    '/(en|id)/:path*', // next-intl paths
    '/:lang/dashboard/:path*', // NextAuth protected paths
    '/:lang/signing/:path*'
  ]
};
