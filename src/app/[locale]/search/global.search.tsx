import UserCard from '@/components/common/cards/user.card';
import CategoryTitle from '@/components/common/cateogry-title';
import ListingsGrid from '@/partials/grid/listings.grid';
import PlacesGrid from '@/partials/grid/places.grid';
import { GlobalSearchResult } from '@/types/data/search.type';
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
        <PlacesGrid
          title={t('relevant places')}
          placesDataFetched={places}
          even
        />
      </div>
      <div className='flex flex-col gap-4'>
        <ListingsGrid
          title={t('relevant listings')}
          listingDataFetched={listings}
        />
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
