import LoadingPrice from '@/loading/skeletons/loading-price';
import LoadingActionButtons from '@/loading/skeletons/loading-action-buttons';

const LoadingListingCard = () => (
  <div className='relative flex h-auto w-full shrink grow gap-3 rounded-xl border border-stroke bg-primary p-2.5 transition'>
    <div className='relative flex h-full w-28 shrink-0 items-center justify-center self-center md:h-[136px] md:w-[136px]'>
      <div className='flex !aspect-square h-28 w-28 items-center justify-center rounded-lg bg-background object-contain p-8 md:h-[136px] md:w-[136px]' />
      <div className='absolute bottom-2 right-2 flex animate-pulse items-center justify-center rounded-md border border-stroke bg-primary px-2 py-1'>
        <span className='text-xs font-semibold text-text-secondary'>⠀⠀⠀⠀</span>
      </div>
    </div>
    <div className='flex w-full flex-col justify-between'>
      <div className='animate-pulse'>
        <h3 className='line-clamp-2 rounded-lg bg-stroke text-lg font-semibold sm:text-xl md:text-2xl'>
          ⠀⠀⠀⠀
        </h3>
        <p className='md:text-md mt-0.5 text-sm font-light text-text-secondary'>
          <span className='break-words rounded-lg bg-stroke text-sm font-semibold text-text-secondary'>
            ⠀⠀⠀⠀⠀⠀⠀⠀
          </span>
        </p>
      </div>
      <div className='flex w-full items-center justify-between gap-2'>
        <LoadingPrice />
        <LoadingActionButtons />
      </div>
    </div>
  </div>
);

export default LoadingListingCard;
