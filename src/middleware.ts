import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import {
  getPath,
  LOGGED_IN_PAGES,
  NOT_LOGGED_IN_PAGES,
} from '@/utils/middleware.util';

import {
  deleteTokensMiddleware,
  logout,
  refreshTokensMiddleware,
} from '@/actions/auth';

import { locales } from '@/constants/locales';
import { HTTPUnauthorizedException } from '@/errors/HTTPExceptions';

const intl = createMiddleware({
  locales,
  defaultLocale: 'en',
});

export default async function middleware(request: NextRequest) {
  const response = intl(request);

  // === Check if token needs to be refreshed ===

  if (
    request.cookies.get('refresh_token') &&
    !request.cookies.get('access_token')
  ) {
    try {
      await refreshTokensMiddleware(response.cookies);
    } catch (err) {
      if (err instanceof HTTPUnauthorizedException) {
        deleteTokensMiddleware(response.cookies);
      } else {
        throw err;
      }
    }
  }

  // === Check if user is logging out ===

  const path = getPath(request.url);

  if (path === '/auth/logout') {
    let logoutResponse = NextResponse.redirect(new URL('/', request.url));

    try {
      await logout(logoutResponse);
    } catch (err) {
      logoutResponse = NextResponse.redirect(
        new URL('/auth/logout-failed', request.url),
      );
    }

    return logoutResponse;
  }

  // === Pages where user should not be logged in ===

  if (
    NOT_LOGGED_IN_PAGES.some((page) => path.startsWith(page)) &&
    request.cookies.get('access_token')
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // === Pages where user should be logged in ===

  if (
    LOGGED_IN_PAGES.some((page) => path.startsWith(page)) &&
    !request.cookies.get('access_token')
  ) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!_next|.*\\..*).*)'],
};
