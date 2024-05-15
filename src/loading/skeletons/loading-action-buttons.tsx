const LoadingActionButtons = () => (
  <div className='z-10 flex h-fit shrink-0 animate-pulse gap-1 overflow-hidden rounded-lg'>
    <div className='flex aspect-square h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-green opacity-30 transition-opacity duration-200 ease-in-out sm:h-12 sm:w-12 lg:h-10 lg:w-10 xl:h-12 xl:w-12'>
      <div className='h-6 w-6 text-background md:h-7 md:w-7' />
    </div>
    <div className='flex aspect-square h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-blue opacity-30 transition-opacity duration-200 ease-in-out sm:h-12 sm:w-12 lg:h-10 lg:w-10 xl:h-12 xl:w-12'>
      <div className='h-6 w-6 text-background md:h-7 md:w-7' />
    </div>
  </div>
);

export default LoadingActionButtons;
