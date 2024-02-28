import { unstable_setRequestLocale } from 'next-intl/server';
import ListingsGrid from '@/partials/grid/listings.grid';
import PageOptions from '@/partials/common/pageOptions';
import { getListings } from '@/fetch/listing.fetch';
import { notFound } from 'next/navigation';
import CategoryTitle from '@/components/common/cateogry-title';

const UserListingsPage = async ({
  params: { locale, username },
  searchParams: { page = 1, limit = 12 },
}: {
  params: { locale: string; username: string };
  searchParams: {
    page: number;
    limit: number;
  };
}) => {
  unstable_setRequestLocale(locale);

  const listingsData = await getListings(page, limit, username);

  if (!listingsData) {
    notFound();
  }

  return (
    <div className='flex w-full flex-col gap-4'>
      <CategoryTitle title={`@${username}'s listings`} />
      <ListingsGrid listingDataFetched={listingsData} />
      <PageOptions
        page={page}
        limit={limit}
        totalItems={listingsData.totalCount}
      />
    </div>
  );
};

export default UserListingsPage;
