import { ShortListingResponse } from '@/types/data/listing.type';
import ListingCard from '@/components/common/cards/listing.card';

const ListingSearch = ({ listings }: { listings: ShortListingResponse[] }) => (
  <div className='grid grid-cols-1 content-stretch items-stretch justify-stretch gap-4 lg:grid-cols-2'>
    {listings.map((listing) => (
      <ListingCard key={listing.uuid} {...listing} />
    ))}
  </div>
);

export default ListingSearch;
