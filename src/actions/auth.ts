/* eslint-disable @typescript-eslint/no-unused-vars */
'use server';

import { revalidateTag, unstable_noStore as noStore } from 'next/cache';

import { axiosInstance } from '@/configs/axios';
import { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const login = async (email: string, password: string) => {
  noStore();

  try {
    const res = await axiosInstance.post('/auth/login', {
      email,
      password,
    });

    console.log('AXIOS URL: ', res.request);

    console.log('====================================');
    console.log('LOGIN', res);
    console.log('====================================');

    if (res.status === 201) {
      const { access_token, refresh_token } = res.data as {
        access_token: string;
        refresh_token: string;
      };

      setTokens(access_token, refresh_token);
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        console.log('====================================');
        console.log('LOGIN ERROR', err.response.data);
        console.log('====================================');
        return {
          errors: 'Email or password is incorrect',
        };
      }
    }
    console.log('====================================');
    console.log('LOGIN ERROR', err);
    console.log('====================================');
  }
};

const loginAction = async (formData: FormData) => {
  noStore();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  console.log('ACTION', email, password);

  if (!email || !password) {
    throw new Error('Invalid form data');
  }

  try {
    await login(email, password);
    revalidateTag('user');
  } catch (err) {
    throw err;
  }

  redirect('/');
};

export async function refreshTokens() {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get('refresh_token');

  if (!refreshToken) {
    return;
  }

  try {
    const response = await axiosInstance.get('/auth/refresh', {
      headers: {
        Authorization: `Bearer ${refreshToken.value}`,
      },
    });

    const { access_token, refresh_token } = response.data as {
      access_token: string;
      refresh_token: string;
    };

    setTokens(access_token, refresh_token);
  } catch (err) {
    console.log('====================================');
    console.log('REFRESH ERROR', err);
    console.log('====================================');
  }
}

// eslint-disable-next-line @typescript-eslint/require-await
async function getAuth() {
  // Get access token from cookies
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');
  const refreshToken = cookieStore.get('refresh_token');

  return {
    accessToken: accessToken?.value || null,
    refreshToken: refreshToken?.value || null,
  };
  //
  // // Refresh existing access and refresh tokens if the access token is expired
  // if (!accessToken) {
  //   await refreshTokens();
  //   accessToken = cookieStore.get('access_token');
  // }
  //
  // if (!accessToken) {
  //   return undefined;
  // }
  //
  // return `Bearer ${accessToken.value}`;
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

  cookieStore.getAll().forEach((cookie) => {
    console.log('====================================');
    console.log('COOKIE', cookie);
    console.log('====================================');
  });

  console.log('====================================');
  console.log('SET TOKENS', accessToken, refreshToken);
};

async function logout() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');
  const refreshToken = cookieStore.get('refresh_token');

  if (!refreshToken || !accessToken) {
    return;
  }

  console.log('====================================');
  console.log('LOGOUT', refreshToken);
  console.log('====================================');

  try {
    const res = await axiosInstance.post('/auth/logout', {
      accessToken: accessToken.value,
      refreshToken: refreshToken.value,
    });

    if (res.status === 200) {
      cookieStore.delete('access_token');
      cookieStore.delete('refresh_token');
    }
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401 || err.response?.status === 403) {
      }
    }
    console.log('====================================');
    console.log('LOGOUT ERROR', err);
    console.log('====================================');
  }

  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
  revalidateTag('user');
}

export { login, loginAction, getAuth, logout };
