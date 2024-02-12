import { paginatedFetch } from '@/utils/paginated-fetch';
import { toInteger } from 'lodash';
import PageOptions from '@/partials/common/pageOptions';
import CategoryTitle from '@/components/common/cateogry-title';
import { CardPlace } from '@/types/data/place.type';
import PlaceCard from '@/components/common/cards/place.card';

const getListings = async (
  page: number = 1,
  limit: number = 6,
  username?: string,
) => {
  try {
    return await paginatedFetch<CardPlace>(
      `/${username ? `user/${username}/` : ''}place`,
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

  const listingsData = await getListings(page, limit);

  if (!listingsData) {
    return <div>Failed to load listings</div>;
  }

  const { data: places, totalCount: totalItems } = listingsData;

  return (
    <div className='flex w-full max-w-screen-2xl flex-col gap-4'>
      <CategoryTitle title='Places' />
      <div className='grid gap-4 min-[1300px]:grid-cols-2'>
        {places.map((place: CardPlace) => (
          <PlaceCard key={place.uuid} place={place} />
        ))}
      </div>
      <PageOptions page={page} limit={limit} totalItems={totalItems} />
    </div>
  );
};

export default PlacesPage;
