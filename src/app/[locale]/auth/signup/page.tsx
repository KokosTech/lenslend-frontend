'use client';
import { useTranslations } from 'next-intl';
import { FormEvent } from 'react';
import { API_URL } from '@/configs/api';

const SingUpPage = () => {
  const t = useTranslations('auth.signup');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = {
      email: formData.get('email'),
      username: formData.get('username'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
      name: formData.get('name'),
      dateOfBirth: formData.get('dateOfBirth'),
      phone: formData.get('phone'),
    };

    const res = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const error = (await res.json()) as { message: string };
      console.log(error);
    }

    const data = (await res.json()) as {
      access_token: string;
      refresh_token: string;
    };
    //   save access token in cookie
    //   save refresh token in cookie

    const { access_token, refresh_token } = data;
    console.log(typeof document);

    return {
      access_token,
      refresh_token,
    };
  };

  // "email": "string",
  //   "username": "string",
  //   "password": "string",
  //   "confirmPassword": "string",
  //   "name": "string",
  //   "dateOfBirth": "string",
  //   "phone": "string"

  return (
    <div className='bg-primary'>
      <h1>{t('title')}</h1>
      <form onSubmit={(e) => void handleSubmit(e)}>
        <div>
          <label htmlFor='email'>{t('email')}</label>
          <input type='email' name='email' id='email' />
        </div>
        <div>
          <label htmlFor='username'>{t('username')}</label>
          <input type='text' name='username' id='username' />
        </div>
        <div>
          <label htmlFor='password'>{t('password')}</label>
          <input type='password' name='password' id='password' />
        </div>
        <div>
          <label htmlFor='confirmPassword'>{t('confirmPassword')}</label>
          <input type='password' name='confirmPassword' id='confirmPassword' />
        </div>
        <div>
          <label htmlFor='name'>{t('name')}</label>
          <input type='text' name='name' id='name' />
        </div>
        <div>
          <label htmlFor='dateOfBirth'>{t('dateOfBirth')}</label>
          <input type='date' name='dateOfBirth' id='dateOfBirth' />
        </div>
        <div>
          <label htmlFor='phone'>{t('phone')}</label>
          <input type='tel' name='phone' id='phone' />
        </div>
        <button type='submit'>{t('submit')}</button>
      </form>
    </div>
  );
};

export default SingUpPage;
