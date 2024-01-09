import Image from 'next/image';
import Gallery from '@/components/project/gallery';
import HorizontalDivider from '@/components/horizontalDivider';
import { Place } from '@/types/data/place.type';

const ImagesPlace = ({ name, images }: Place) =>
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
