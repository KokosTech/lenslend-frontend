import { unstable_setRequestLocale } from 'next-intl/server';
import Search from '@/partials/common/seatch';
import { API_URL } from '@/configs/api';
import { ShortListingResponse } from '@/types/data/listing.type';
import { ShortPlace, User } from '@/types/data/place.type';
import ListingCard from '@/components/common/cards/listing.card';

const getSearch = async (search: string, category?: string) => {
  const res = await fetch(
    `${API_URL}/search?search=${search}&category=${category}`,
    {
      next: {
        revalidate: 60,
      },
    },
  );
  const data = (await res.json()) as {
    listings: ShortListingResponse[];
    places: ShortPlace[];
    users: User[];
  };

  console.log(data);

  return data;
};

const SearchPage = async ({
  searchParams: { search, category },
  params: { locale },
}: {
  searchParams: {
    search: string;
    category?: string;
  };
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { listings, places, users } = await getSearch(search, category);

  return (
    <div className='flex flex-col gap-4 py-10'>
      <Search />
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Search results for {search}</h1>
        <p>Category: {category}</p>
      </div>
      {listings.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-bold'>Listings</h2>
          <div className='flex flex-col gap-4'>
            {listings.map((listing) => (
              <ListingCard key={listing.uuid} {...listing} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
