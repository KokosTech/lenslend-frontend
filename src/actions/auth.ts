/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { jwtDecode } from 'jwt-decode';
import { revalidateTag, unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { API_URL } from '@/configs/api';
import { z } from 'zod';
import { NextResponse } from 'next/server';
import { SignupFormState } from '@/types/forms/signup.form';

type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

class FormError extends Error {
  constructor(public message: string) {
    super();
  }
}

const loginSchema = z.object({
  email: z.string().email({
    message: 'errors.invalid_email',
  }),
  password: z.string().min(8, {
    message: 'errors.min_length',
  }),
});

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

const signup = async (
  data: SignupFormState,
  prevState: unknown,
  formData: FormData,
) => {
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

export async function refreshTokens() {
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
    throw new Error('Failed to refresh tokens');
  }

  const data = (await response.json()) as {
    access_token: string;
    refresh_token: string;
  };

  const { access_token, refresh_token } = data;

  setTokens(access_token, refresh_token);
}

async function isAuth() {
  noStore();

  const cookieStore = cookies();
  let accessToken = cookieStore.get('access_token');

  if (!accessToken) {
    try {
      await refreshTokens();
      accessToken = cookieStore.get('access_token');
    } catch (err) {
      return false;
    }
  }

  return accessToken !== undefined;
}

async function getAuth() {
  noStore();

  const cookieStore = cookies();
  const auth = await isAuth();

  if (!auth) {
    return null;
  }

  const accessToken = cookieStore.get('access_token');

  if (!accessToken) {
    return null;
  }

  return `Bearer ${accessToken.value}`;
}

const setTokens = (accessToken: string, refreshToken: string) => {
  const accessExpiry = jwtDecode(accessToken).exp;
  const refreshExpiry = jwtDecode(refreshToken).exp;

  const cookieStore = cookies();

  cookieStore.set('access_token', accessToken, {
    expires: accessExpiry ? accessExpiry * 1000 : undefined,
  });
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

const deleteTokens = () => {
  const cookieStore = cookies();

  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
};

async function logout(response: NextResponse) {
  noStore();

  const { accessToken, refreshToken } = getTokens();

  if (!refreshToken || !accessToken) {
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');
    // revalidateTag('user');
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
    response.cookies.delete('access_token');
    response.cookies.delete('refresh_token');

    // revalidateTag('user');
  }
}

const canModify = async (userUuid: string) => {
  noStore();

  const accessToken = await getAuth();

  if (!accessToken) {
    return false;
  }

  const res = await fetch(`${API_URL}/user/me`, {
    headers: {
      Authorization: accessToken,
    },
  });

  console.log('res', res.status);

  if (!res.ok) {
    return false;
  }

  const data = (await res.json()) as {
    uuid: string;
    role: 'ADMIN' | 'MOD' | 'USER';
  };

  return data.uuid === userUuid || data.role === 'ADMIN' || data.role === 'MOD';
};

export { getAuth, signup, loginAction, logout, isAuth, canModify };
