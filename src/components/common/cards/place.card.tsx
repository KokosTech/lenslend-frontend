import Link from 'next/link';

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
  <Link
    href={`/place/${place.uuid}`}
    className='relative flex w-full max-w-xl flex-col gap-3 rounded-xl border border-stroke bg-primary p-2.5'
  >
    <div className='relative h-60 w-full overflow-hidden rounded-xl'>
      <img
        className='absolute h-full w-full object-cover'
        src={place.images[0]?.url}
        alt={place.name}
      />
    </div>
    <div className='flex w-full flex-col justify-between'>
      <div>
        <h3 className='line-clamp-2 text-lg font-semibold sm:text-xl md:text-2xl'>
          {place.name}
        </h3>
        <p className='md:text-md text-sm font-light text-text-secondary'>
          {place.lng}, {place.lat}
        </p>
      </div>
      {/* <div className='flex w-full items-center justify-between gap-4'>*/}
      {/*  <div className='flex w-full items-center justify-between gap-4'>*/}
      {/*    <p className='text-lg font-semibold sm:text-xl md:text-2xl'>*/}
      {/*      /!*{place.price} BGN*!/*/}
      {/*    </p>*/}
      {/*  </div>*/}
      {/* </div>*/}
    </div>
  </Link>
);

export default PlaceCard;
