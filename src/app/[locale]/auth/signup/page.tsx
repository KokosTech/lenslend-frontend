import { useTranslations } from 'next-intl';

import SignupFrom from '@/partials/auth/signup/signupFrom';
import AuthWrapper from '@/wrappers/auth.wrapper';
import { unstable_setRequestLocale } from 'next-intl/server';

const SingUpPage = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations('auth.signup');

  return (
    <AuthWrapper
      title={t('title')}
      alt={{
        href: '/auth/login',
        text: t('already_have_account'),
        action: t('login'),
      }}
    >
      <SignupFrom key='signup' />
    </AuthWrapper>
  );
};
export default SingUpPage;
