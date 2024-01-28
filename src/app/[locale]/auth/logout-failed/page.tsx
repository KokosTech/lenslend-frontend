import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';

const LogoutFailedPage = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
  // const t = useTranslations('auth');

  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-4'>
      <h1 className='text-3xl font-semibold'>Logout failed</h1>
      <Link href={'/'}>Go back to the homepage</Link>
    </div>
  );
};

export default LogoutFailedPage;
