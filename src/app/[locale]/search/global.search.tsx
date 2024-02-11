import { CardPlace } from '@/types/data/place.type';
import PlaceCard from '@/components/common/cards/place.card';
import ListingCard from '@/components/common/cards/listing.card';
import UserCard from '@/components/common/cards/user.card';
import { GlobalSearchResult } from '@/types/data/search.type';
import CategoryTitle from '@/components/common/cateogry-title';
import { useTranslations } from 'next-intl';

const GlobalSearch = ({
  data: { listings, places, users },
}: {
  data: GlobalSearchResult;
}) => {
  const t = useTranslations('search');

  if (!listings || !places || !users) {
    return <div>Search failed</div>;
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <CategoryTitle title={t('relevant places')} />
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'>
          {places.data.map((place: CardPlace) => (
            <PlaceCard place={place} key={place.uuid} />
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <CategoryTitle title={t('relevant listings')} />
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          {listings.data.map((listing) => (
            <ListingCard key={listing.uuid} {...listing} />
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <CategoryTitle title={t('relevant_users')} />
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6'>
          {users.data.map((user) => (
            <UserCard user={user} key={user.uuid} />
          ))}
        </div>
      </div>
    </>
  );
};

export default GlobalSearch;
