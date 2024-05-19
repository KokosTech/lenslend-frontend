import { useTranslations } from 'next-intl';

import SignupFrom from '@/partials/auth/signup/signupFrom';
import AuthWrapper from '@/wrappers/auth.wrapper';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { Metadata, ResolvingMetadata } from 'next';

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

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
  parent: ResolvingMetadata;
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'navigation',
  });

  return {
    title: t('signup'),
  };
}

export default SingUpPage;
