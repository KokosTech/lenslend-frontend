import Address from '@/components/common/address';
import { IconStar } from '@tabler/icons-react';
import Link from 'next/link';
import PlaceActionButtons from '@/wrappers/placeActionButtons';

const PlaceCard = ({
  place,
}: {
  place: {
    uuid: string;
    name: string;
    lat: number;
    lng: number;
    thumbnail: {
      url: string;
      alt: string;
    };
    rating: number;
  };
}) => (
  <div className='relative flex w-full flex-col gap-3 rounded-xl border border-stroke bg-primary p-2.5 transition-all hover:border-stroke-secondary'>
    <div className='relative !aspect-[5/3] w-full overflow-hidden rounded-lg border border-stroke'>
      <img
        className='absolute !aspect-[4/3] w-full object-cover'
        src={place.thumbnail.url}
        alt={place.name}
      />
      {place.rating > 0 && (
        <div className='absolute bottom-2 left-2 flex items-center justify-center gap-1 rounded-lg border border-stroke bg-primary/60 p-1.5 px-2 backdrop-blur-lg'>
          <IconStar size={18} />
          <p className='text-white text-sm font-semibold'>{place.rating}</p>
        </div>
      )}
    </div>
    <div className='flex w-full items-end justify-between gap-2'>
      <div className='flex flex-col'>
        <h3 className='line-clamp-2 font-semibold sm:text-lg md:text-2xl'>
          {place.name}
        </h3>
        <Address lat={place.lat} lng={place.lng} size='text-sm' />
      </div>
      <PlaceActionButtons uuid={place.uuid} />
    </div>
    <Link href={`/places/${place.uuid}`} className='absolute h-full w-full' />
  </div>
);

export default PlaceCard;
