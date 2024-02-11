import PlaceCard from '@/components/common/cards/place.card';
import { paginatedFetch } from '@/utils/paginated-fetch';
import CategoryTitle from '@/components/common/cateogry-title';
import { PaginatedResponse } from '@/types/paginated-response.type';

const getPlaces = async (category?: string, username?: string) => {
  try {
    const data = await paginatedFetch<{
      uuid: string;
      name: string;
      lat: number;
      lng: number;
      thumbnail: {
        url: string;
        alt: string;
      };
      rating: number;
    }>(
      `${username ? `/user/${username}` : ''}/place?format=card${category ? `&category=${category}` : ''}`,
      1,
      4,
      {
        next: {
          revalidate: 60,
        },
        cache: 'no-cache',
      },
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const PlacesGrid = async ({
  title,
  url,
  username,
  category,
}: {
  title?: string;
  url?: string;
  username?: string;
  category?: string;
}) => {
  const placesData: PaginatedResponse<{
    uuid: string;
    name: string;
    lat: number;
    lng: number;
    thumbnail: {
      url: string;
      alt: string;
    };
    rating: number;
  }> | null = await getPlaces(category, username);

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
            ? '2xl:grid-cols-2 min-[1800px]:grid-cols-3 min-[1800px]:grid-rows-[1fr_0_0] min-[1800px]:gap-y-0'
            : 'lg:grid-cols-2 2xl:grid-cols-3 2xl:grid-rows-[1fr_0_0] 2xl:gap-y-0'
        }`}
      >
        {places.map((place) => (
          <PlaceCard key={place.uuid} place={place} />
        ))}
      </div>
    </div>
  );
};

export default PlacesGrid;
