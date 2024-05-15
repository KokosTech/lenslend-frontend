import ListingGridSkeleton from '@/loading/skeletons/listing/listing-grid-skeleton';

const TestPage = () => (
  <div className='w-full'>
    <h1>Test Page</h1>
    <ListingGridSkeleton title='Test' count={4} />
  </div>
);

export default TestPage;
