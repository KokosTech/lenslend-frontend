import Address from '@/components/common/address';
import PlaceActionButtons from '@/wrappers/placeActionButtons';
import Link from 'next/link';

const LoadingPlaceCard = () => (
  <div className='relative flex w-full flex-col gap-3 rounded-xl border border-stroke bg-primary p-2.5 transition-all hover:border-stroke-secondary'>
    <div className='relative !aspect-[5/3] w-full overflow-hidden rounded-lg border border-stroke'>
      <div className='absolute !aspect-[4/3] w-full bg-stroke object-cover' />
    </div>
    <div className='flex w-full items-end justify-between gap-2'>
      <div className='flex flex-col'>
        <h3 className='line-clamp-2 font-semibold sm:text-lg md:text-2xl'>
          {place.name}
        </h3>
        <Address lat={place.lat} lng={place.lng} size='text-sm' />
      </div>
      {!noActions && <PlaceActionButtons uuid={place.uuid} />}
    </div>
    <Link href={`/places/${place.uuid}`} className='absolute h-full w-full' />
  </div>
);

export default LoadingPlaceCard;
