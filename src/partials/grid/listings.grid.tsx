import ListingCard from '@/components/common/cards/listing.card';
import { ShortListingResponse } from '@/types/data/listing.type';
import { getListings } from '@/fetch/listing.fetch';
import CategoryTitle from '@/components/common/cateogry-title';
import { PaginatedResponse } from '@/types/paginated-response.type';

// const getListings = async (username?: string) => {
//   const response = await fetch(
//     `${API_URL}/${username ? `user/${username}/` : ''}listing`,
//   );
//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }
//
//   const data = (await response.json()) as ShortListingResponse[];
//
//   return data;
// };

// const getListings = async (username?: string) => {
//   try {
//     const data = await paginatedFetch<ShortListingResponse>(
//       `/${username ? `user/${username}/` : ''}listing`,
//       1,
//       6,
//       {
//         next: {
//           revalidate: 60,
//         },
//       },
//     );
//
//     return data.data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

const ListingsGrid = async ({
  title,
  url,
  username,
  category,
  noActions,
  page,
  limit,
  listingDataFetched,
}: {
  title?: string;
  url?: string;
  username?: string;
  category?: string;
  noActions?: boolean;
  visibility?: 'PUBLIC' | 'PRIVATE';
  page?: number;
  limit?: number;
  listingDataFetched?: PaginatedResponse<ShortListingResponse>;
}) => {
  const listingsData =
    listingDataFetched ??
    (await getListings(page || 1, limit || 6, username, category));

  if (!listingsData) {
    return <div>Failed to load listings</div>;
  }

  const { data: listings, totalCount } = listingsData;

  if (listings.length === 0) {
    return null;
  }

  return (
    <div className='flex w-full flex-col gap-4'>
      {title && (
        <CategoryTitle title={title} url={totalCount < 6 ? undefined : url} />
      )}
      <div
        className={`grid grid-cols-1 content-start gap-4 ${
          username ? '2xl:grid-cols-2' : 'min-[1300px]:grid-cols-2'
        }`}
      >
        {listings.map((listing: ShortListingResponse) => (
          <ListingCard key={listing.uuid} {...listing} noActions={noActions} />
        ))}
      </div>
    </div>
  );
};

export default ListingsGrid;
