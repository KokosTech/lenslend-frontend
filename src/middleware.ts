import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales } from '@/constants/locales';

const intl = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',
});

export default function middleware(request: NextRequest) {
  if (request.url.includes('/logout')) {
    console.log('====================================');
    console.log('LOGOUT');
    console.log('====================================');
    const response = NextResponse.redirect(new URL('/', request.url));

    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');

    return response;
  }

  return intl(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!_next|.*\\..*).*)'],
};
