import { unstable_setRequestLocale } from 'next-intl/server';

import SearchSkeleton from '@/loading/skeletons/search-skeleton';
import PlaceGridSkeleton from '@/loading/skeletons/place/place-grid-skeleton';
import ListingGridSkeleton from '@/loading/skeletons/listing/listing-grid-skeleton';
import UserGridSkeleton from '@/loading/skeletons/user/user-grid-skeleton';

const TestPage = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);

  return (
    <div className='w-full'>
      <h1>Test Page</h1>
      <SearchSkeleton />
      <ListingGridSkeleton title='Test' count={4} />
      <PlaceGridSkeleton title='Test' count={4} />
      <UserGridSkeleton title='Test' count={4} />
    </div>
  );
};

export default TestPage;
