import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales } from '@/constants/locales';
import { logout } from '@/actions/auth';

const intl = createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',
});

export default async function middleware(request: NextRequest) {
  if (request.url.includes('/logout') && !request.url.includes('failed')) {
    let response = NextResponse.redirect(new URL('/', request.url));

    try {
      await logout(response);
    } catch (err) {
      response = NextResponse.redirect(
        new URL('/auth/logout-failed', request.url),
      );
    }

    return response;
  }

  if (request.url.includes('/login')) {
    const response = NextResponse.redirect(new URL('/', request.url));
    if (request.cookies.get('access_token')) {
      return response;
    }
  }

  return intl(request);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!_next|.*\\..*).*)'],
};
