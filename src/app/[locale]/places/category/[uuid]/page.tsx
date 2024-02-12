import { unstable_setRequestLocale } from 'next-intl/server';
import getCategory from '@/fetch/category.fetch';
import CategoryTitle from '@/components/common/cateogry-title';
import { paginatedFetch } from '@/utils/paginated-fetch';
import { CardPlace } from '@/types/data/place.type';
import { PaginatedResponse } from '@/types/paginated-response.type';
import PlaceCard from '@/components/common/cards/place.card';
import PageOptions from '@/partials/common/pageOptions';
import { toInteger } from 'lodash';

const getPlaces = async (
  page: number = 1,
  limit: number = 12,
  username?: string,
  category?: string,
) => {
  try {
    return await paginatedFetch<CardPlace>(
      `/${username ? `user/${username}/` : ''}place${
        category ? `?category=${category}` : ''
      }`,
      page,
      limit,
      {
        next: {
          revalidate: 60,
        },
      },
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

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
      <CategoryTitle title={categoryData.name} />
      <div className='grid grid-cols-3 gap-4'>
        {places.map((place: CardPlace) => (
          <PlaceCard place={place} key={place.uuid} />
        ))}
      </div>
      <PageOptions page={page} limit={limit} totalItems={totalItems} />
    </div>
  );
};

export default PlacesCategoryPage;
