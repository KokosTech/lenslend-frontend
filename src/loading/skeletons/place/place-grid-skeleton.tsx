import CategoryTitle from '@/components/common/cateogry-title';
import LoadingPlaceCard from '@/loading/skeletons/place/loading-card';

const PlaceGridSkeleton = ({
  title,
  username,
  count = 6,
}: {
  title?: string;
  username?: string;
  count?: number;
}) => (
  <div className='flex w-full flex-col gap-4'>
    {title && <CategoryTitle title={title} />}
    <div
      className={`grid w-full animate-pulse grid-cols-1 gap-4 overflow-hidden ${
        username
          ? '2xl:grid-cols-2 min-[1800px]:grid-cols-3 min-[1800px]:grid-rows-[1fr_0_0] min-[1800px]:gap-y-0'
          : 'lg:grid-cols-2 2xl:grid-cols-3 2xl:grid-rows-[1fr_0_0] 2xl:gap-y-0'
      }`}
    >
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      {[...Array(count)].map((_, index) => (
        <LoadingPlaceCard key={index} />
      ))}
    </div>
  </div>
);

export default PlaceGridSkeleton;
