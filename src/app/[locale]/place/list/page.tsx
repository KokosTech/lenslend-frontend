import { toInteger } from 'lodash';
import PageOptions from '@/partials/common/pageOptions';
import { getPlaces } from '@/fetch/place.fetch';
import PlacesGrid from '@/partials/grid/places.grid';
import { Metadata, ResolvingMetadata } from 'next';
import { getTranslations } from 'next-intl/server';

const PlacesPage = async ({
  searchParams: { page = 1, limit = 12 },
}: {
  searchParams: {
    page: number;
    limit: number;
  };
}) => {
  if (Number.isNaN(toInteger(page)) || Number.isNaN(toInteger(limit))) {
    return <div>Invalid page or limit</div>;
  }

  const placesData = await getPlaces(page, limit);

  if (!placesData) {
    return <div>Failed to load listings</div>;
  }

  const { totalCount: totalItems } = placesData;

  return (
    <div className='flex w-full max-w-screen-2xl flex-col gap-4'>
      <PlacesGrid title={'Places'} placesDataFetched={placesData} />
      <PageOptions page={page} limit={limit} totalItems={totalItems} />
    </div>
  );
};

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
  parent: ResolvingMetadata;
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'navigation',
  });

  return {
    title: t('places'),
  };
}

export default PlacesPage;
