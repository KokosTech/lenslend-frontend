import { IconFaceIdError } from '@tabler/icons-react';
import { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

const LogoutFailedPage = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations('');

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
      <IconFaceIdError size={84} />
      <h1 className='text-3xl font-semibold'>{t('auth.logout_failed')}</h1>
      <Link href={'/'}>{t('errors.go_back')}</Link>
    </div>
  );
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'auth',
  });

  return {
    title: t('logout_failed'),
  };
}

export default LogoutFailedPage;
