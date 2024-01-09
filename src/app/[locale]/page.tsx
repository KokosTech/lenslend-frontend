import { useLocale } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import ListingsGrid from '@/partials/grid/listings.grid';
import { Suspense } from 'react';
import PlacesGrid from '@/partials/grid/places.grid';
import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import Search from '@/partials/common/seatch';

const Home = () => {
  const locale = useLocale();
  unstable_setRequestLocale(locale);

  console.log('Hello from src/app/page.tsx');
  return (
    <>
      <Suspense fallback='Loading...'>
        <div className='flex flex-col gap-4'>
          <div className='!aspect-[32/9] w-full rounded-xl border border-stroke bg-primary p-4'></div>
          <Search />
          <div className='flex items-center justify-between p-2'>
            <h1 className='text-xl font-bold sm:text-3xl'>
              Latest locations on the map
            </h1>
            <Link
              href={`/${locale}/places`}
              className='flex items-center gap-2 text-sm font-semibold text-text-secondary'
            >
              view all
              <IconChevronRight className='h-4 w-4' />
            </Link>
          </div>
          <ListingsGrid />
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold'>Latest equipment on sale</h1>
            <Link
              href={`/${locale}/listings`}
              className='text-sm font-semibold'
            >
              view all
            </Link>
          </div>
          <PlacesGrid />
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold'>Popular freelancers</h1>
            <Link href={`/${locale}/places`} className='text-sm font-semibold'>
              view all
            </Link>
          </div>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold'>Photography equipment</h1>
            <Link href={`/${locale}/places`} className='text-sm font-semibold'>
              view all
            </Link>
          </div>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold'>Video equipment</h1>
            <Link href={`/${locale}/places`} className='text-sm font-semibold'>
              view all
            </Link>
          </div>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold'>Great cafes</h1>
            <Link href={`/${locale}/places`} className='text-sm font-semibold'>
              view all
            </Link>
          </div>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold'>Amazing restaurants</h1>
            <Link href={`/${locale}/places`} className='text-sm font-semibold'>
              view all
            </Link>
          </div>
          <div className='flex items-center justify-between'>
            <h1 className='text-3xl font-bold'>Cool offices</h1>
            <Link href={`/${locale}/places`} className='text-sm font-semibold'>
              view all
            </Link>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default Home;
