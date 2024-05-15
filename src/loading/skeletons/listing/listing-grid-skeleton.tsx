import CategoryTitle from '@/components/common/cateogry-title';
import LoadingListingCard from '@/loading/skeletons/listing/loading-card';

const ListingGridSkeleton = ({
  title,
  username,
  count = 14,
}: {
  title: string;
  username?: string;
  count?: number;
}) => (
  <div className='flex w-full flex-col gap-4'>
    {title && <CategoryTitle title={title} />}
    <div
      className={`grid animate-pulse grid-cols-1 content-start gap-4 ${
        username ? '2xl:grid-cols-2' : 'min-[1300px]:grid-cols-2'
      }`}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      {[...Array(count)].map((_, index) => (
        <LoadingListingCard key={index} />
      ))}
    </div>
  </div>
);

export default ListingGridSkeleton;
