import Link from 'next/link';
import Address from '@/components/common/address';
import ListingActionButtons from '@/wrappers/listingActionButtons';

const PlaceCard = ({
  place,
}: {
  place: {
    uuid: string;
    name: string;
    lat: number;
    lng: number;
    images: {
      url: string;
    }[];
  };
}) => (
  <div className='relative flex w-full flex-col gap-3 rounded-xl border border-stroke bg-primary p-2.5 transition-all hover:scale-[1.01]'>
    <div className='relative !aspect-[5/3] w-full overflow-hidden rounded-xl border border-stroke'>
      <img
        className='absolute !aspect-[4/3] w-full object-cover'
        src={place.images[0]?.url}
        alt={place.name}
      />
    </div>
    <div className='flex w-full items-end justify-between gap-2'>
      <div className='flex flex-col'>
        <h3 className='line-clamp-2 font-semibold sm:text-lg md:text-2xl'>
          {place.name}
        </h3>
        <Address lat={place.lat} lng={place.lng} size='text-sm' />
      </div>
      <ListingActionButtons uuid={place.uuid} userUuid={'fsfsdf'} />

      {/* <div className='flex w-full items-center justify-between gap-4'>*/}
      {/*  <div className='flex w-full items-center justify-between gap-4'>*/}
      {/*    <p className='text-lg font-semibold sm:text-xl md:text-2xl'>*/}
      {/*      /!*{place.price} BGN*!/*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/* </div>*/}
    </div>
    <Link href={`/place/${place.uuid}`} className='absolute h-full w-full' />
  </div>
);

export default PlaceCard;
