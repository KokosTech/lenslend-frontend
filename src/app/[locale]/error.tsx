'use client'; // Error components must be Client components

import Link from 'next/link';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <h2 className='bg-gradient bg-clip-text text-5xl font-black text-transparent'>
        Нещо се обърка, пробвай пак
      </h2>
      <button
        className='text-white mt-8 rounded-md bg-primary px-5 py-2 transition-all hover:scale-105'
        onClick={() => reset()}
      >
        Опитай пак
      </button>
      <Link
        className='text-white mt-8 rounded-md bg-primary px-5 py-2 transition-all hover:scale-105'
        href={'/'}
      >
        Върни се към началната страница
      </Link>
    </div>
  );
}
