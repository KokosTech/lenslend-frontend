import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import Search from '@/partials/common/seatch';
import ListingsGrid from '@/partials/grid/listings.grid';
import PlacesGrid from '@/partials/grid/places.grid';
import UsersGrid from '@/partials/grid/users.grid';

import Footer from '@/components/home/footer';
import HeaderImage from '@/components/home/header';
import HorizontalDivider from '@/components/horizontalDivider';

import ListingGridSkeleton from '@/loading/skeletons/listing/listing-grid-skeleton';
import PlaceGridSkeleton from '@/loading/skeletons/place/place-grid-skeleton';
import SearchSkeleton from '@/loading/skeletons/search-skeleton';
import UserGridSkeleton from '@/loading/skeletons/user/user-grid-skeleton';

const Home = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations('discover');

  return (
    <div className='flex w-full max-w-screen-2xl flex-col gap-4'>
      <HeaderImage />
      {/* Search */}
      <Suspense fallback={<SearchSkeleton key='search-skeleton' />}>
        <Search />
      </Suspense>
      {/* Latest Locations */}
      <Suspense
        fallback={
          <PlaceGridSkeleton
            title={t('latest_locations')}
            count={4}
            key='latest-locations-skeleton'
          />
        }
      >
        <PlacesGrid title={t('latest_locations')} url={'/place/list'} even />
      </Suspense>
      {/* Latest Listings */}
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
      {/* Popular Users */}
      <Suspense
        fallback={
          <UserGridSkeleton
            title={t('popular_users')}
            count={6}
            key='popular-users-skeleton'
          />
        }
      >
        <UsersGrid title={t('popular_users')} url={'/user'} />
      </Suspense>
      {/* Popular Categories */}
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
      {/* Video Listings */}
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
      {/* Cafes (Places) */}
      <Suspense
        fallback={
          <PlaceGridSkeleton
            title={t('cafes')}
            count={4}
            key='cafes-places-skeleton'
          />
        }
      >
        <PlacesGrid
          title={t('cafes')}
          url={'/place/category/1'}
          category='1'
          even
        />
      </Suspense>
      {/* Restaurants (Places) */}
      <Suspense
        fallback={
          <PlaceGridSkeleton
            title={t('restaurants')}
            count={4}
            key='restaurants-places-skeleton'
          />
        }
      >
        <PlacesGrid
          title={t('restaurants')}
          url={'/place/category/650cf655-3247-4c58-976e-caaf48d1ba86'}
          category='650cf655-3247-4c58-976e-caaf48d1ba86'
          even
        />
      </Suspense>
      {/* Offices (Places) */}
      <Suspense
        fallback={
          <PlaceGridSkeleton
            title={t('offices')}
            count={4}
            key='offices-places-skeleton'
          />
        }
      >
        <PlacesGrid
          title={t('offices')}
          url={'/place/category/4f1e7e29-d640-4928-9572-1ccfd592e089'}
          category='4f1e7e29-d640-4928-9572-1ccfd592e089'
          even
        />
      </Suspense>
      <HorizontalDivider />
      <Footer />
    </div>
  );
};

export default Home;
