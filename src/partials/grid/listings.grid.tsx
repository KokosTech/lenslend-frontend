import { ListingResponse } from '@/types/data/listing';
import ListingCard from '@/components/common/cards/listing.card';

const getListings = async () => {
  const response = await fetch('http://localhost:8080/listing');
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  console.log(data);

  return data;
};

const ListingsGrid = async ({}) => {
  const listings: ListingResponse[] =
    (await getListings()) as ListingResponse[];

  return (
    // <div className='grid w-full grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3'>
    <div className='flex flex-wrap items-start justify-center gap-4'>
      {listings.map((listing: ListingResponse) => (
        <ListingCard key={listing.uuid} {...listing} />
      ))}
    </div>
  );
};

export default ListingsGrid;
