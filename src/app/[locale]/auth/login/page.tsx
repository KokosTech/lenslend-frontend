import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import LoginForm from '@/partials/login/form';
import AuthWrapper from '@/wrappers/auth.wrapper';
import { Metadata } from 'next';

const LoginPage = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('auth.login');

  return (
    <AuthWrapper
      title={t('title')}
      alt={{
        href: '/auth/signup',
        text: t('new_here'),
        action: t('signup'),
      }}
    >
      <LoginForm key='login' />
    </AuthWrapper>
  );
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'navigation',
  });

  return {
    title: t('login'),
  };
}

export default LoginPage;
