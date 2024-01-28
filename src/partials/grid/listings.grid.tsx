import { ShortListingResponse } from '@/types/data/listing.type';
import ListingCard from '@/components/common/cards/listing.card';
import { API_URL } from '@/configs/api';

const getListings = async () => {
  const response = await fetch(`${API_URL}/listing`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = (await response.json()) as ShortListingResponse[];
  // console.log(data);

  return data;
};

const ListingsGrid = async ({}) => {
  const listings: ShortListingResponse[] = await getListings();

  return (
    // <div className='grid w-full grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3'>
    <div className='flex flex-wrap items-start justify-center gap-4'>
      {listings.map((listing: ShortListingResponse) => (
        <ListingCard key={listing.uuid} {...listing} />
      ))}
    </div>
  );
};

export default ListingsGrid;
