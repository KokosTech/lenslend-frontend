import Image from 'next/image';
import Gallery from '@/components/project/gallery';
import HorizontalDivider from '@/components/horizontalDivider';
import { Place } from '@/types/data/place.type';
import { IconStar } from '@tabler/icons-react';

const ImagesPlace = ({ name, images, rating }: Place) =>
  images.length > 0 ? (
    <>
      <div className='flex flex-col gap-4'>
        <div className='relative aspect-video w-full overflow-hidden rounded-lg border border-stroke bg-primary'>
          <Image
            src={images[0].url}
            alt={name}
            layout='fill'
            className='object-cover object-center'
          />
          {rating > 0 && (
            <div className='absolute bottom-2 left-2 flex items-center justify-center gap-1 rounded-lg border border-stroke bg-primary/60 p-1.5 px-2 backdrop-blur-lg'>
              <IconStar size={18} />
              <p className='text-white text-sm font-semibold'>{rating}</p>
            </div>
          )}
        </div>
        {images.length > 1 && (
          <Gallery pictures={images} name={name} borderless />
        )}
      </div>
      <HorizontalDivider />
    </>
  ) : (
    <div className='h-14 w-full bg-primary' />
  );

export default ImagesPlace;
