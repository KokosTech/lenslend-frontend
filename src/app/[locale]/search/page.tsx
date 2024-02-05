/* eslint-disable indent */

import ListingCard from '@/components/common/cards/listing.card';
import PlaceCard from '@/components/common/cards/place.card';
import UserCard from '@/components/common/cards/user.card';
import { API_URL } from '@/configs/api';
import Search from '@/partials/common/seatch';
import { ShortListingResponse } from '@/types/data/listing.type';
import { CardPlace, User } from '@/types/data/place.type';
import { unstable_setRequestLocale } from 'next-intl/server';

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
    places: CardPlace[];
    users: User[];
  };

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
      {(category === undefined || category === 'Equipment') &&
        listings.length > 0 && (
          <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold'>Relevant listings</h2>
            <div className='grid grid-cols-2 gap-4'>
              {listings.map((listing) => (
                <ListingCard key={listing.uuid} {...listing} />
              ))}
            </div>
          </div>
        )}
      {(category === undefined || category === 'Places') &&
        places.length > 0 && (
          <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold'>Relevant places</h2>
            <div className='grid grid-cols-3 gap-4'>
              {places.map((place: CardPlace) => (
                <PlaceCard place={place} key={place.uuid} />
              ))}
            </div>
          </div>
        )}
      {(category === undefined || category === 'Freelancers') &&
        users.length > 0 && (
          <div className='flex flex-col gap-4'>
            <h2 className='text-2xl font-bold'>Relevant users</h2>
            <div className='grid grid-cols-6 gap-4'>
              {users.map((user) => (
                <UserCard user={user} key={user.uuid} />
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default SearchPage;
