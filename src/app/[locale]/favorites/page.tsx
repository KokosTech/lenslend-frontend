/* eslint-disable indent */
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import CategoryTitle from '@/components/common/cateogry-title';
import { Suspense } from 'react';
import ListingsGrid from '@/partials/grid/listings.grid';
import { getAuth } from '@/actions/auth';
import { notFound } from 'next/navigation';
import {
  getFavoriteListings,
  getFavoritePlaces,
} from '@/fetch/favorites.fetch';
import PlacesGrid from '@/partials/grid/places.grid';
import PlaceGridSkeleton from '@/loading/skeletons/place/place-grid-skeleton';
import ListingGridSkeleton from '@/loading/skeletons/listing/listing-grid-skeleton';
import { Metadata } from 'next';

const FavoritesPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('favorites');

  const auth = await getAuth('ssr');
  if (!auth) notFound();

  const favoriteListings = await getFavoriteListings(1, 6, auth);
  const favouritePlaces = await getFavoritePlaces(1, 4, auth);
  console.log(favouritePlaces);

  return (
    <div className='flex w-full flex-col gap-4'>
      <CategoryTitle title={t('title')} />
      <Suspense
        fallback={<ListingGridSkeleton title={t('listings')} count={6} />}
      >
        {favoriteListings &&
          favoriteListings.data &&
          favoriteListings.data.length > 0 && (
            <ListingsGrid
              title={t('listings')}
              listingDataFetched={favoriteListings}
            />
          )}
      </Suspense>
      <Suspense fallback={<PlaceGridSkeleton title={t('places')} count={4} />}>
        {favouritePlaces &&
          favouritePlaces.data &&
          favouritePlaces.data.length > 0 && (
            <PlacesGrid
              title={t('places')}
              placesDataFetched={favouritePlaces}
              even
            />
          )}
      </Suspense>
    </div>
  );
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'favorites',
  });

  return {
    title: t('title'),
  };
}

export default FavoritesPage;
