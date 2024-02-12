import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('listing.errors.404');

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-8'>
      <h2 className='bg-gradient bg-clip-text text-2xl font-black text-transparent'>
        {t('title')}
      </h2>
      <p className='text-center text-lg'>{t('message')}</p>
      <a
        href='/places'
        className='text-white inline-flex items-center justify-center whitespace-nowrap rounded-md bg-[#353444] px-5 py-[10px] text-base font-semibold transition-all hover:bg-primary'
      >
        {t('action')}
      </a>
    </div>
  );
}
