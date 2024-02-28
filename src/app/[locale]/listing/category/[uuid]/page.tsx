import { unstable_setRequestLocale } from 'next-intl/server';
import { getListings } from '@/fetch/listing.fetch';
import PageOptions from '@/partials/common/pageOptions';
import getCategory from '@/fetch/category.fetch';
import ListingsGrid from '@/partials/grid/listings.grid';

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
      <ListingsGrid
        title={categoryData.name}
        listingDataFetched={listingsData}
      />
      <PageOptions page={page} limit={limit} totalItems={totalItems} />
    </div>
  );
};

export default ListingCategoryPage;
