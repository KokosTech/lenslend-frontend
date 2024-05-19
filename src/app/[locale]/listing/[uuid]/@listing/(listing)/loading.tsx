import React from 'react';

const LoadingListing = () => (
  <div className='flex w-full flex-col justify-center gap-4 pb-4 pt-2 md:pt-8 lg:flex-row'>
    <div className='flex w-full max-w-screen-lg shrink flex-col items-center gap-4'>
      {/* Cover */}
      <div className='flex w-full animate-pulse gap-4'>
        <div className='w-full shrink rounded-xl border-2 border-stroke bg-primary'>
          <div className='relative aspect-video overflow-hidden rounded-xl border-b-2 border-b-stroke' />
          <div className='flex items-center justify-between px-8 py-4'>
            <h2 className='rounded-lg bg-stroke text-2xl font-bold lg:text-xl xl:text-2xl'>
              ⠀⠀⠀⠀ ⠀⠀⠀⠀ ⠀ ⠀⠀⠀⠀ ⠀⠀⠀⠀
            </h2>
            <div className='flex items-center gap-4'>
              <div className='text-right text-sm opacity-70'>
                {/*  price */}
                <p className='flex flex-wrap text-lg font-semibold sm:text-xl xl:text-2xl'>
                  <span className='mr-1.5 flex items-center break-keep text-sm text-text-secondary'>
                    ⠀⠀⠀⠀
                  </span>
                  ⠀⠀⠀⠀
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className='w-full animate-pulse'>
        <div className=' rounded-xl border-2 border-stroke bg-primary text-justify'>
          <div className='relative space-y-4 px-8 py-4'>
            <p className='text-md relative h-96 whitespace-pre-wrap break-words'></p>
          </div>
        </div>
      </div>
      {/* Publish Comment */}
      <div className='w-full animate-pulse'>
        <div className='flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-stroke bg-primary px-8 py-4 text-justify'>
          <div className='flex h-32 w-full items-center gap-4'></div>
        </div>
      </div>
    </div>
    <div className='flex h-fit flex-col items-center gap-4 lg:sticky lg:top-5'>
      {/* Profile */}
      <div className='flex w-full animate-pulse flex-col gap-2 rounded-xl bg-primary p-2'>
        <div className='relative aspect-video h-96 w-full overflow-hidden rounded-lg lg:w-80 xl:w-96'></div>
      </div>
      {/*  Contact Map */}
      <div className='flex w-full animate-pulse flex-col gap-2 rounded-xl border-2 border-stroke bg-primary p-2'>
        <div className='relative aspect-video h-full w-full overflow-hidden rounded-lg border-2 border-stroke lg:w-80 xl:w-96'></div>
      </div>
    </div>
  </div>
);

export default LoadingListing;
