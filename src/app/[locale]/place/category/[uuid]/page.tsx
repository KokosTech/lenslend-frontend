import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import getCategory from '@/fetch/category.fetch';
import { CardPlace } from '@/types/data/place.type';
import { PaginatedResponse } from '@/types/paginated-response.type';
import PageOptions from '@/partials/common/pageOptions';
import { toInteger } from 'lodash';
import { getPlaces } from '@/fetch/place.fetch';
import PlacesGrid from '@/partials/grid/places.grid';
import { Metadata, ResolvingMetadata } from 'next';

const PlacesCategoryPage = async ({
  params: { locale, uuid },
  searchParams: { page = 1, limit = 12 },
}: {
  params: {
    locale: string;
    uuid: string;
  };
  searchParams: {
    page: number;
    limit: number;
  };
}) => {
  unstable_setRequestLocale(locale);

  if (Number.isNaN(toInteger(page)) || Number.isNaN(toInteger(limit))) {
    return <div>Invalid page or limit</div>;
  }

  const placesData: PaginatedResponse<CardPlace> | null = await getPlaces(
    page,
    limit,
    undefined,
    uuid,
  );
  const categoryData = await getCategory(uuid, 'PLACE');

  if (!categoryData || !placesData) {
    return <div>Failed to load places</div>;
  }

  const { data: places, totalCount: totalItems } = placesData;

  if (places.length === 0) {
    return <div>No places found</div>;
  }

  return (
    <div className='flex w-full flex-col gap-4'>
      <PlacesGrid title={categoryData.name} placesDataFetched={placesData} />
      <PageOptions page={page} limit={limit} totalItems={totalItems} />
    </div>
  );
};

export async function generateMetadata({
  params: { locale, uuid },
}: {
  params: { locale: string; uuid: string };
  parent: ResolvingMetadata;
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'navigation',
  });
  const categoryData = await getCategory(uuid, 'PLACE');

  return {
    title: categoryData ? categoryData.name : t('places'),
  };
}

export default PlacesCategoryPage;
