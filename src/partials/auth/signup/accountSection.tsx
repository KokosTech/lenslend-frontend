import { ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';

import Input from '@/components/common/input';
import { SignupFormErrors, SignupFormState } from '@/types/forms/signup.form';
import PasswordInput from '@/components/common/password.input';

const AccountSection = ({
  handleChange,
  values,
  errors,
}: {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  values: SignupFormState;
  errors: SignupFormErrors;
}) => {
  const t = useTranslations('auth.signup');

  return (
    <>
      <Input
        id='email'
        placeholder={t('email')}
        type='email'
        name='email'
        icon='IconMail'
        autoComplete={'email'}
        value={values.email}
        onChange={handleChange}
        errors={errors.email}
        required
      />
      <Input
        id='username'
        placeholder={t('username')}
        type='text'
        name='username'
        icon='IconUser'
        value={values.username}
        onChange={handleChange}
        errors={errors.username}
        required
      />
      <PasswordInput
        id='password'
        placeholder={t('password')}
        type='password'
        name='password'
        icon='IconLock'
        autoComplete='new-password'
        value={values.password}
        onChange={handleChange}
        errors={errors.password}
        required
      />
      <PasswordInput
        id='confirmPassword'
        placeholder={t('confirm_password')}
        type='password'
        name='confirmPassword'
        icon='IconLock'
        autoComplete={'new-password'}
        value={values.confirmPassword}
        onChange={handleChange}
        errors={errors.confirmPassword}
        required
      />
    </>
  );
};

export default AccountSection;
