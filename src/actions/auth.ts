'use server';

import { jwtDecode } from 'jwt-decode';

import { revalidateTag, unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import { API_URL } from '@/configs/api';

import { HTTPUnauthorizedException } from '@/errors/HTTPExceptions';
import { loginSchema } from '@/schemas/login.auth.schema';
import { SignupFormState } from '@/types/forms/signup.form';
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';

type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

class FormError extends Error {
  constructor(public message: string) {
    super();
  }
}

const login = async (email: string, password: string): Promise<boolean> => {
  noStore();

  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (res.status === 201) {
    const { access_token, refresh_token } = (await res.json()) as AuthResponse;

    setTokens(access_token, refresh_token);
    return true;
  }

  throw new FormError('errors.invalid_credentials');
};

const loginAction = async (prevState: unknown, formData: FormData) => {
  noStore();

  let logged = false;

  const validatedData = loginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedData.success) {
    return {
      messages: validatedData.error.issues.map((issue) => issue.message),
    };
  }

  const { email, password } = validatedData.data;

  try {
    logged = await login(email, password);
    revalidateTag('user');
  } catch (err) {
    if (err instanceof FormError) {
      return {
        messages: [err.message],
      };
    }

    return {
      messages: ['errors.500'],
    };
  }

  if (logged) redirect('/');
};

const signup = async (data: SignupFormState) => {
  try {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const { access_token, refresh_token } =
        (await res.json()) as AuthResponse;

      setTokens(access_token, refresh_token);
      return true;
    }

    return {
      messages: ['errors.500'],
    };
  } catch (e) {
    return {
      messages: ['errors.500'],
    };
  }
};

export const refreshTokensAndReturnAccess = async () => {
  noStore();

  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refresh_token');

  if (!refreshToken) {
    throw new Error('No refresh token found');
  }

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${refreshToken.value}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    if (response.status === 401) {
      throw new HTTPUnauthorizedException();
    }

    throw new Error('Failed to refresh tokens');
  }

  const data = (await response.json()) as {
    access_token: string;
  };

  return data.access_token;
};

export const isAuth = async (
  rendering: 'client' | 'ssr',
): Promise<string | false> => {
  noStore();

  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');

  if (!accessToken) {
    try {
      const new_access = await refreshTokensAndReturnAccess();

      // In client server actions you can mutate the cookie store directly
      // In SSR server actions you can't mutate the cookie store, so in this unlikely case (since we have a middleware for this), we just create a new access token and return it (without storing it)
      if (rendering === 'client') {
        setTokens(new_access);
      }

      return new_access;
    } catch (err) {
      return false;
    }
  }

  return accessToken.value;
};

export const getAuth = async (
  rendering: 'client' | 'ssr',
): Promise<string | null> => {
  noStore();

  const auth = await isAuth(rendering);

  if (!auth) {
    return null;
  }

  return `Bearer ${auth}`;
};

const setTokens = (accessToken: string, refreshToken?: string | null) => {
  noStore();

  const cookieStore = cookies();

  const accessExpiry = jwtDecode(accessToken).exp;
  cookieStore.set('access_token', accessToken, {
    expires: accessExpiry ? accessExpiry * 1000 : undefined,
  });

  if (!refreshToken) return;

  const refreshExpiry = jwtDecode(refreshToken).exp;
  cookieStore.set('refresh_token', refreshToken, {
    expires: refreshExpiry ? refreshExpiry * 1000 : undefined,
  });
};

const getTokens = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');
  const refreshToken = cookieStore.get('refresh_token');

  return {
    accessToken: accessToken?.value ?? undefined,
    refreshToken: refreshToken?.value ?? undefined,
  };
};

// === Middleware Auth Functions ===

export const refreshTokensMiddleware = async (cookieStore: ResponseCookies) => {
  const newToken = await refreshTokensAndReturnAccess();
  const newTokenExpiry = jwtDecode(newToken).exp;

  cookieStore.set('access_token', newToken, {
    expires: newTokenExpiry ? newTokenExpiry * 1000 : undefined,
  });
};

const deleteTokensMiddleware = (cookieStore: ResponseCookies) => {
  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
};

async function logout(response: NextResponse) {
  noStore();

  const { accessToken, refreshToken } = getTokens();

  if (!refreshToken || !accessToken) {
    deleteTokensMiddleware(response.cookies);
    return;
  }

  const res = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      accessToken,
      refreshToken,
    }),
  });

  if (res.status === 200 || res.status === 201 || res.status === 401) {
    deleteTokensMiddleware(response.cookies);
  }
}

const canModify = async (userUuid: string) => {
  noStore();

  const accessToken = await getAuth('client');

  if (!accessToken) {
    return false;
  }

  const res = await fetch(`${API_URL}/user/me`, {
    headers: {
      Authorization: accessToken,
    },
  });

  if (!res.ok) {
    return false;
  }

  const data = (await res.json()) as {
    uuid: string;
    role: 'ADMIN' | 'MOD' | 'USER';
  };

  return data.uuid === userUuid || data.role === 'ADMIN' || data.role === 'MOD';
};

export { canModify, deleteTokensMiddleware, loginAction, logout, signup };
