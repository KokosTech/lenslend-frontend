import LoadingActionButtons from '../loading-action-buttons';

const LoadingPlaceCard = () => (
  <div className='relative flex w-full flex-col gap-3 rounded-xl border border-stroke bg-primary p-2.5 transition-all'>
    <div className='relative !aspect-[5/3] w-full overflow-hidden rounded-lg border border-stroke'>
      <div className='absolute !aspect-[4/3] w-full bg-background object-cover' />
    </div>
    <div className='flex w-full items-end justify-between gap-2'>
      <div className='relative flex w-full animate-pulse flex-col'>
        <div className='line-clamp-2 h-7 w-1/2 rounded-lg bg-stroke text-lg font-semibold sm:text-xl md:text-2xl' />
        <p className='md:text-md mt-0.5 text-sm font-light text-text-secondary'>
          <div className='h-4 w-full max-w-24 break-words rounded-lg bg-stroke text-sm font-semibold text-text-secondary' />
        </p>
      </div>
      <LoadingActionButtons />
    </div>
  </div>
);

export default LoadingPlaceCard;
