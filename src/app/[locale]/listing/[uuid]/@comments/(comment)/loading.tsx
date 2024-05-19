const LoadingComments = () => (
  <div className='flex w-full animate-pulse justify-center gap-4'>
    <div className='flex w-full max-w-screen-lg flex-col gap-4 rounded-xl border-2 border-stroke bg-primary px-8 py-4'>
      <div className='h-36 w-full animate-pulse rounded-lg bg-stroke' />
      <div className='h-36 w-full animate-pulse rounded-lg bg-stroke' />
      <div className='h-36 w-full animate-pulse rounded-lg bg-stroke' />
    </div>
    <div className='hidden flex-col items-center gap-4 lg:flex'>
      <div className='flex w-full flex-col gap-2 border-2 border-transparent p-2'>
        <div className='relative aspect-video h-full w-full  lg:w-80 xl:w-96'></div>
        <div className='flex w-full flex-col gap-2 px-2 pb-2 lg:w-80 xl:w-96' />
      </div>
    </div>
  </div>
);

export default LoadingComments;
