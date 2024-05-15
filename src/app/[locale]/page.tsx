import Search from '@/partials/common/seatch';
import ListingsGrid from '@/partials/grid/listings.grid';
import PlacesGrid from '@/partials/grid/places.grid';
import UsersGrid from '@/partials/grid/users.grid';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';
import Image from 'next/image';
import HorizontalDivider from '@/components/horizontalDivider';
import { useTranslations } from 'next-intl';
import ListingGridSkeleton from '@/loading/skeletons/listing/listing-grid-skeleton';

const HeaderImage = () => (
  <div className='relative !aspect-[32/9] w-full overflow-hidden rounded-xl border border-stroke bg-primary p-4'>
    <Image
      src={
        'https://storage.lenslend.kaloyan.tech/og/Screenshot+2024-02-10+at+18.33.33.png'
      }
      alt={'header image'}
      layout='fill'
      className={'object-cover'}
    />
  </div>
);

const Home = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations('discover');

  return (
    <div className='flex w-full max-w-screen-2xl flex-col gap-4'>
      <HeaderImage />
      <Suspense fallback='Loading...'>
        <Search />
      </Suspense>
      <Suspense fallback='Loading...'>
        <PlacesGrid title={t('latest_locations')} url={'/place/list'} />
      </Suspense>
      <Suspense
        fallback={
          <ListingGridSkeleton
            title={t('latest_listings')}
            count={6}
            key='latest-listings-skeleton'
          />
        }
      >
        <ListingsGrid
          title={t('latest_listings')}
          url={'/listing'}
          key='latest-listings'
        />
      </Suspense>
      <Suspense fallback='Loading...'>
        <UsersGrid title={t('popular_users')} url={'/user'} />
      </Suspense>
      <Suspense
        fallback={
          <ListingGridSkeleton
            title={t('photography')}
            count={6}
            key='photography-listings-skeleton'
          />
        }
      >
        <ListingsGrid
          title={t('photography')}
          url={'/listing/category/aaaa-bbbb-cccc-dddd'}
          category={'aaaa-bbbb-cccc-dddd'}
        />
      </Suspense>
      <Suspense
        fallback={
          <ListingGridSkeleton
            title={t('video')}
            count={6}
            key='video-listings-skeleton'
          />
        }
      >
        <ListingsGrid
          title={t('video')}
          url={'/listing/category/34f3c028-3813-42cb-b4b1-5a6fa3ea01c3'}
          category={'34f3c028-3813-42cb-b4b1-5a6fa3ea01c3'}
        />
      </Suspense>
      <Suspense fallback='Loading...'>
        <PlacesGrid title={t('cafes')} url={'/place/category/1'} category='1' />
      </Suspense>
      <Suspense fallback='Loading...'>
        <PlacesGrid
          title={t('restaurants')}
          url={'/place/category/650cf655-3247-4c58-976e-caaf48d1ba86'}
          category='650cf655-3247-4c58-976e-caaf48d1ba86'
        />
      </Suspense>
      <Suspense fallback='Loading...'>
        <PlacesGrid
          title={t('offices')}
          url={'/place/category/4f1e7e29-d640-4928-9572-1ccfd592e089'}
          category='4f1e7e29-d640-4928-9572-1ccfd592e089'
        />
      </Suspense>
      <HorizontalDivider />
      <footer className='flex w-full justify-center rounded-xl border border-stroke bg-primary p-4'>
        <p className='text-white'>© {new Date().getFullYear()} LensLend</p>
      </footer>
    </div>
  );
};

export default Home;
