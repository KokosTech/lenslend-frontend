'use client'; // Error components must be Client components

import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const t = useTranslations('errors');

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <h2 className='bg-gradient bg-clip-text text-5xl font-black text-transparent'>
        {t('something_went_wrong')}
        {error.message}
      </h2>
      <button
        className='text-white mt-8 rounded-md bg-primary px-5 py-2 transition-all hover:scale-105'
        onClick={() => reset()}
      >
        {t('try_again')}
      </button>
    </div>
  );
}
