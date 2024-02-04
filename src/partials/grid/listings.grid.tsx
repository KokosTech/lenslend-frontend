import { ShortListingResponse } from '@/types/data/listing.type';
import ListingCard from '@/components/common/cards/listing.card';
import { API_URL } from '@/configs/api';

const getListings = async (username?: string) => {
  const response = await fetch(
    `${API_URL}/${username ? `user/${username}/` : ''}listing`,
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as ShortListingResponse[];
  // console.log(data);

  return data;
};

const ListingsGrid = async ({
  username,
  noActions,
}: {
  username?: string;
  noActions?: boolean;
  visibility?: 'PUBLIC' | 'PRIVATE';
}) => {
  const listings: ShortListingResponse[] = await getListings(username);

  return (
    // <div className='grid w-full grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3'>
    <div className='grid gap-4 p-2 min-[1300px]:grid-cols-2'>
      {listings.map((listing: ShortListingResponse) => (
        <ListingCard key={listing.uuid} {...listing} noActions={noActions} />
      ))}
    </div>
  );
};

export default ListingsGrid;
