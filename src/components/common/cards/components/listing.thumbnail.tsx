import { IconCameraCancel } from '@tabler/icons-react';
import Image from 'next/image';

const ListingThumbnail = ({
  image,
  state,
}: {
  image: {
    url: string;
    alt: string;
  } | null;
  state: string;
}) => (
  <div className='relative flex h-full w-28 shrink-0 items-center justify-center self-center md:h-[136px] md:w-[136px]'>
    {image ? (
      <Image
        src={image.url}
        alt={image.alt}
        width={136}
        height={136}
        className='!aspect-square h-28 w-28  rounded-lg border border-stroke object-cover md:h-[136px] md:w-[136px] '
      />
    ) : (
      <div className='flex !aspect-square h-28 w-28 items-center justify-center rounded-lg bg-background object-contain p-8 md:h-[136px] md:w-[136px]'>
        <IconCameraCancel className='h-full w-full' />
      </div>
    )}
    <div className='absolute bottom-2 right-2 flex items-center justify-center rounded-md border border-stroke bg-primary px-2 py-1'>
      <span className='text-xs font-semibold text-text-secondary'>{state}</span>
    </div>
  </div>
);

export default ListingThumbnail;
