import ShareButton from '@/components/common/buttons/shareButton';
import ListingActionButtons from '@/wrappers/listingActionButtons';
import Price from '@/components/common/price';
import Image from 'next/image';

const Cover = ({
  uuid,
  userUuid,
  userPhone,
  image,
  title,
  price,
  rental,
}: {
  uuid: string;
  userUuid: string;
  userPhone: string;
  image?: {
    url: string;
    alt: string;
  };
  title: string;
  price?: number;
  rental?: number;
}) => (
  <div className='flex w-full gap-4'>
    <div className='w-full shrink rounded-xl border-2 border-stroke bg-primary'>
      <div className='relative aspect-video overflow-hidden rounded-xl border-b-2 border-b-stroke'>
        <ShareButton />
        {image && (
          <Image
            src={image.url}
            alt={image.alt}
            layout='fill'
            className='object-cover'
          />
        )}
        <ListingActionButtons
          uuid={uuid}
          userUuid={userUuid}
          phone={userPhone}
          addClass='absolute bottom-4 right-4 z-10'
        />
      </div>
      <div className='flex items-center justify-between px-8 py-4'>
        <h2 className='text-2xl font-bold lg:text-xl xl:text-2xl'>{title}</h2>
        <div className='flex items-center gap-4'>
          <div className='text-right text-sm opacity-70'>
            <Price price={price} rental={rental} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Cover;
