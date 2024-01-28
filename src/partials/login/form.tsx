'use client';

import { loginAction } from '@/actions/auth';
import Link from 'next/link';
import Input from '@/components/common/input';
import SubmitButton from '@/components/common/buttons/submitButton';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import FormErrors from '@/components/common/form/errors';

const initialState = {
  messages: [],
};

const LoginForm = () => {
  const [state, formAction] = useFormState(loginAction, initialState);
  const t = useTranslations('auth.login');

  return (
    <form
      action={formAction}
      className='flex w-full flex-col gap-4 font-semibold sm:w-fit'
    >
      <Input
        id='email'
        placeholder={t('email')}
        type='email'
        name='email'
        icon='IconUser'
        autoComplete={'email'}
        required
      />
      <Input
        id='password'
        placeholder={t('password')}
        type='password'
        name='password'
        icon='IconLock'
        required
      />
      <div className='flex items-center justify-between'>
        <Link
          href={'/auth/forgot-password'}
          className='font-medium text-text-secondary transition-colors hover:text-text-important'
        >
          {t('forgot_password')}
        </Link>
        <SubmitButton pendingContent={t('pending')}>{t('submit')}</SubmitButton>
      </div>
      <FormErrors errors={state?.messages} t={t} />
    </form>
  );
};

export default LoginForm;
