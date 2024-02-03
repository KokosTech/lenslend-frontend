'use client'; // Error components must be Client components

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const t = useTranslations('listing.comments');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex w-full justify-center gap-4'>
      <div className='flex w-full max-w-screen-lg flex-col gap-4'>
        <div className='flex flex-col items-center justify-between gap-4 rounded-xl border-2 border-stroke bg-primary px-8 py-4 text-justify lg:flex-row'>
          <h4 className='text-center text-lg font-medium text-text-important'>
            {t('errorLoading')}
          </h4>
          <button
            className='rounded-md bg-blue px-4 py-2 font-semibold transition-all hover:scale-105'
            onClick={() => reset()}
          >
            {t('tryAgain')}
          </button>
        </div>
      </div>
      <div className='hidden flex-col items-center gap-4 lg:flex'>
        <div className='flex w-full flex-col gap-2 border-2 border-transparent p-2'>
          <div className='relative aspect-video h-full w-full  lg:w-80 xl:w-96'></div>
          <div className='flex w-full flex-col gap-2 px-2 pb-2 lg:w-80 xl:w-96' />
        </div>
      </div>
    </div>
  );
}
