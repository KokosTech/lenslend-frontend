import { unstable_setRequestLocale } from 'next-intl/server';
import ListingsGrid from '@/partials/grid/listings.grid';
import { Suspense } from 'react';
import PlacesGrid from '@/partials/grid/places.grid';
import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import Search from '@/partials/common/seatch';
import UsersGrid from '@/partials/grid/users.grid';

const HeaderImage = () => (
  <div className='!aspect-[32/9] w-full rounded-xl border border-stroke bg-primary p-4'></div>
);

const CategoryTitle = ({ title, url }: { title: string; url: string }) => (
  <div className='flex items-center justify-between p-2'>
    <h1 className='text-xl font-bold sm:text-3xl'>{title}</h1>
    <Link
      href={url}
      className='flex items-center gap-2 text-sm font-semibold text-text-secondary'
    >
      view all
      <IconChevronRight className='h-4 w-4' />
    </Link>
  </div>
);

const Home = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);

  console.log('Hello from src/app/page.tsx');
  return (
    <div className='flex w-full justify-center'>
      <div className='flex max-w-screen-2xl flex-col gap-4'>
        <HeaderImage />
        <Suspense fallback='Loading...'>
          <Search />
        </Suspense>
        <CategoryTitle title='Latest locations on the map' url={'/places'} />
        <Suspense fallback='Loading...'>
          <PlacesGrid />
        </Suspense>
        <CategoryTitle title='Latest equipment on sale' url={'/listings'} />
        <Suspense fallback='Loading...'>
          <ListingsGrid />
        </Suspense>
        <CategoryTitle title={'Popular freelancers'} url={'/users'} />
        <Suspense fallback='Loading...'>
          <UsersGrid />
        </Suspense>
        <CategoryTitle title={'Photography equipment'} url={''} />
        <CategoryTitle title={'Video equipment'} url={''} />
        <CategoryTitle title={'Great cafes'} url={''} />
        <CategoryTitle title={'Amazing restaurants'} url={''} />
        <CategoryTitle title={'Cool offices'} url={''} />
      </div>
    </div>
  );
};

export default Home;
