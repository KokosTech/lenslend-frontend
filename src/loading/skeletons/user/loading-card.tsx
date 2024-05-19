const LoadingUserCard = () => (
  <div className='flex shrink grow-0 cursor-pointer flex-col gap-2 overflow-hidden rounded-xl border border-stroke bg-primary p-2.5 transition-all hover:border-stroke-secondary'>
    <div className='relative animate-pulse overflow-hidden rounded-lg border border-stroke'>
      <div className='flex aspect-square w-full items-center justify-center bg-background' />
    </div>
    <div className='flex w-full flex-grow animate-pulse flex-col items-center justify-evenly gap-2'>
      <p className='line-clamp-2 w-full rounded-lg bg-stroke text-center text-lg font-bold xl:text-xl'>
        ⠀⠀⠀⠀
      </p>
      <p className='w-1/2 rounded-xl border border-stroke-secondary bg-stroke px-2 py-1 text-xs font-semibold text-text-secondary xl:text-xs'>
        ⠀⠀⠀⠀
      </p>
    </div>
  </div>
);
export default LoadingUserCard;
