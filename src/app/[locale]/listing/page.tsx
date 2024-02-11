import ListingCard from '@/components/common/cards/listing.card';
import { ShortListingResponse } from '@/types/data/listing.type';
import { toInteger } from 'lodash';
import PageOptions from '@/partials/common/pageOptions';
import CategoryTitle from '@/components/common/cateogry-title';
import { getListings } from '@/fetch/listing.fetch';

const ListingsPage = async ({
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

  const { data: listings, totalCount: totalItems } = listingsData;

  return (
    <div className='flex w-full max-w-screen-2xl flex-col gap-4'>
      <CategoryTitle title='Listings' />
      <div className='grid gap-4 min-[1300px]:grid-cols-2'>
        {listings.map((listing: ShortListingResponse) => (
          <ListingCard key={listing.uuid} {...listing} />
        ))}
      </div>
      <PageOptions page={page} limit={limit} totalItems={totalItems} />
    </div>
  );
};

export default ListingsPage;
