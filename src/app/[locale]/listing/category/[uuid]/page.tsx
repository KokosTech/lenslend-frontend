import { unstable_setRequestLocale } from 'next-intl/server';
import { getListings } from '@/fetch/listing.fetch';
import { ShortListingResponse } from '@/types/data/listing.type';
import ListingCard from '@/components/common/cards/listing.card';
import PageOptions from '@/partials/common/pageOptions';
import CategoryTitle from '@/components/common/cateogry-title';
import getCategory from '@/fetch/category.fetch';

const ListingCategoryPage = async ({
  params: { locale, uuid },
  searchParams: { page = 1, limit = 12 },
}: {
  params: {
    locale: string;
    uuid: string;
  };
  searchParams: {
    page: number;
    limit: number;
  };
}) => {
  unstable_setRequestLocale(locale);

  const listingsData = await getListings(page, limit, undefined, uuid);
  const categoryData = await getCategory(uuid, 'LISTING');

  if (!listingsData || !categoryData) {
    return <div>Failed to load listings</div>;
  }

  const { data: listings, totalCount: totalItems } = listingsData;

  if (listings.length === 0) {
    return <div>No listings found</div>;
  }

  return (
    <div className='flex w-full flex-col gap-4'>
      <CategoryTitle title={categoryData.name} />
      <div className='grid gap-4 min-[1300px]:grid-cols-2'>
        {listings.map((listing: ShortListingResponse) => (
          <ListingCard key={listing.uuid} {...listing} />
        ))}
      </div>
      <PageOptions page={page} limit={limit} totalItems={totalItems} />
    </div>
  );
};

export default ListingCategoryPage;
