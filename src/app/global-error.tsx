'use client';

import React from 'react';

import { ThemeProvider } from '@/context/ThemeProvider';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);

  return (
    <html className='dark'>
      <body className={'flex flex-row bg-background text-text'}>
        <ThemeProvider>
          <main className='min-h-screen w-full px-4 pb-4 pt-24 md:py-4'>
            <div className='flex h-screen w-full flex-col items-center justify-center'>
              <h2 className='bg-gradient bg-clip-text p-2 text-5xl font-black text-transparent'>
                Something went wrong
              </h2>
              <h2 className='bg-gradient bg-clip-text p-2 text-5xl font-black text-transparent'>
                Нещо се обърка
              </h2>
              <button
                className='text-white mt-8 rounded-md bg-primary px-5 py-2 transition-all hover:scale-105'
                onClick={() => reset()}
              >
                Try again / Опитай пак
              </button>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
