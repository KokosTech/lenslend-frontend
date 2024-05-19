import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import PageOptions from '@/partials/common/pageOptions';
import { notFound } from 'next/navigation';
import CategoryTitle from '@/components/common/cateogry-title';
import { getPlaces } from '@/fetch/place.fetch';
import PlacesGrid from '@/partials/grid/places.grid';

const UserPlacesPage = async ({
  params: { locale, username },
  searchParams: { page = 1, limit = 12 },
}: {
  params: { locale: string; username: string };
  searchParams: {
    page: number;
    limit: number;
  };
}) => {
  unstable_setRequestLocale(locale);

  const listingsData = await getPlaces(page, limit, username);

  if (!listingsData) {
    notFound();
  }

  return (
    <div className='flex w-full flex-col gap-4'>
      <CategoryTitle title={`@${username}'s listings`} />
      <PlacesGrid placesDataFetched={listingsData} />
      <PageOptions
        page={page}
        limit={limit}
        totalItems={listingsData.totalCount}
      />
    </div>
  );
};

export async function generateMetadata({
  params: { locale, username },
}: {
  params: { locale: string; username: string };
}) {
  const t = await getTranslations({
    locale,
    namespace: 'user',
  });

  return {
    title: t('places', { username }),
  };
}

export default UserPlacesPage;
