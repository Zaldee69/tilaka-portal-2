import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'id'],

  // Used when no locale matches
  defaultLocale: 'id',

  // will not show default local pathname eg. /en/...
  localePrefix: 'as-needed',

  // will use default local
  localeDetection: false
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|id)/:path*']
};
