import PageOptions from '@/partials/common/pageOptions';

import CategoryTitle from '@/components/common/cateogry-title';
import ListingCard from '@/components/common/cards/listing.card';
import PageLimitError from '@/components/error/page-limit.error';

import { getListings } from '@/fetch/listing.fetch';

import { ShortListingResponse } from '@/types/data/listing.type';

import { DEFAULT_LISTING_LIMIT, DEFAULT_PAGE } from '@/constants/limits';

const ListingsPage = async ({
  searchParams: { page = DEFAULT_PAGE, limit = DEFAULT_LISTING_LIMIT },
}: {
  searchParams: {
    page: number;
    limit: number;
  };
}) => {
  if (Number.isNaN(page) || Number.isNaN(limit) || limit < 1 || page < 1) {
    return <PageLimitError />;
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
