import PlaceCard from '@/components/common/cards/place.card';
import CategoryTitle from '@/components/common/cateogry-title';
import { PaginatedResponse } from '@/types/paginated-response.type';
import { CardPlace } from '@/types/data/place.type';
import { getPlaces } from '@/fetch/place.fetch';

const PlacesGrid = async ({
  title,
  url,
  username,
  category,
  noActions,
  page,
  limit,
  placesDataFetched,
  even,
}: {
  title?: string;
  url?: string;
  username?: string;
  category?: string;
  noActions?: boolean;
  visibility?: 'PUBLIC' | 'PRIVATE';
  page?: number;
  limit?: number;
  placesDataFetched?: PaginatedResponse<CardPlace>;
  even?: boolean;
}) => {
  const placesData: PaginatedResponse<CardPlace> | null =
    placesDataFetched ?? (await getPlaces(page, limit, username, category));

  if (!placesData) {
    return <div>Failed to load places</div>;
  }

  const { data: places, totalCount } = placesData;

  if (!places) {
    return <div>No places found</div>;
  }

  if (totalCount === 0) {
    return null;
  }

  return (
    <div className='flex w-full flex-col gap-4'>
      {title && (
        <CategoryTitle title={title} url={totalCount < 4 ? undefined : url} />
      )}
      <div
        className={`grid w-full grid-cols-1 gap-4 overflow-hidden ${
          username
            ? `2xl:grid-cols-2 min-[1800px]:grid-cols-3 ${even && 'min-[1800px]:grid-rows-[1fr_0_0] min-[1800px]:gap-y-0'}`
            : `lg:grid-cols-2 2xl:grid-cols-3 ${even && '2xl:grid-rows-[1fr_0_0] 2xl:gap-y-0'}`
        }`}
      >
        {places.map((place) => (
          <PlaceCard key={place.uuid} place={place} noActions={noActions} />
        ))}
      </div>
    </div>
  );
};

export default PlacesGrid;
