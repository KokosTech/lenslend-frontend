import CategoryTitle from '@/components/common/cateogry-title';
import LoadingUserCard from '@/loading/skeletons/user/loading-card';

const UserGridSkeleton = ({
  title,
  count = 6,
}: {
  title?: string;
  count?: number;
}) => (
  <>
    {title && <CategoryTitle title={title} />}
    <div className='grid w-full animate-pulse grid-cols-2 grid-rows-[1fr_1fr_0] justify-items-stretch gap-x-4 gap-y-4 overflow-hidden sm:grid-cols-3 md:grid-cols-2 min-[880px]:grid-cols-3 lg:grid-cols-4 lg:grid-rows-[1fr_0_0] lg:gap-y-0 xl:grid-cols-5 2xl:grid-cols-6'>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      {[...Array(count)].map((_, index) => (
        <LoadingUserCard key={index} />
      ))}
    </div>
  </>
);

export default UserGridSkeleton;
