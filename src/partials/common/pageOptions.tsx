'use client';

import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/dist/client/components/navigation';
import { useCallback } from 'react';
import { toInteger } from 'lodash';

export type PageOptionsProps = {
  page: number;
  limit: number;
  totalItems: number;
};

export const PageOptions = ({ page, limit, totalItems }: PageOptionsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(toInteger(totalItems) / toInteger(limit));

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  const handlePage = (nextPage: number) => {
    if (nextPage === page) return;

    router.replace(
      `${pathname}?${createQueryString('page', nextPage.toString())}`,
      {
        scroll: false,
      },
    );
  };

  if (page > totalPages) {
    router.replace(
      `${pathname}?${createQueryString('page', totalPages.toString())}`,
      {
        scroll: false,
      },
    );
  }

  return (
    <div className='flex w-full justify-center gap-4'>
      <button
        className='flex h-12 w-12 items-center justify-center rounded-xl border border-stroke bg-primary hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none'
        disabled={toInteger(page) === 1 || totalPages === 0}
        onClick={() => handlePage(page - 1)}
      >
        <IconChevronLeft className='h-6 w-6' />
      </button>
      <p className='flex w-fit items-center justify-center  rounded-xl border border-stroke bg-primary px-4 font-semibold hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none'>
        {page} / {totalPages}
      </p>
      <div className='relative'>
        <select
          className='relative flex h-full cursor-pointer appearance-none items-center justify-center rounded-xl border border-stroke bg-primary px-2 pr-6 font-semibold hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none'
          value={limit}
          onChange={(e) => {
            router.replace(
              `${pathname}?${createQueryString('limit', e.target.value)}`,
              {
                scroll: false,
              },
            );
          }}
        >
          <option value='2'>2</option>
          <option value='12'>12</option>
          <option value='24'>24</option>
          <option value='48'>48</option>
        </select>
        {/* make the cursor pass through to select */}
        <IconChevronDown className='pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform' />
      </div>
      <button
        className='flex h-12 w-12 items-center justify-center rounded-xl border border-stroke bg-primary hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none'
        disabled={toInteger(page) === totalPages || totalPages === 0}
        onClick={() => handlePage(1 + toInteger(page))}
      >
        <IconChevronRight className='h-6 w-6' />
      </button>
    </div>
  );
};

export default PageOptions;
