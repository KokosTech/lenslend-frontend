import Link from 'next/link';

const PlaceCard = ({
  place,
}: {
  place: {
    uuid: string;
    title: string;
    description: string;
    location: {
      lat: number;
      lng: number;
      city: string;
      county: string;
    };
    price?: number;
    image: {
      url: string;
    };
  };
}) => (
  <Link
    href={`/place/${place.uuid}`}
    className='relative flex w-full max-w-xl flex-col gap-3 rounded-xl border border-stroke bg-primary p-2.5'
  >
    <div className='relative h-60 w-full overflow-hidden rounded-xl'>
      <img
        className='absolute h-full w-full object-cover'
        src={place.image.url}
        alt={place.title}
      />
    </div>
    <div className='flex w-full flex-col justify-between'>
      <div>
        <h3 className='line-clamp-2 text-lg font-semibold sm:text-xl md:text-2xl'>
          {place.title}
        </h3>
        <p className='md:text-md text-sm font-light text-text-secondary'>
          {place.location.city}, {place.location.county}
        </p>
      </div>
      <div className='flex w-full items-center justify-between gap-4'>
        <div className='flex w-full items-center justify-between gap-4'>
          <p className='text-lg font-semibold sm:text-xl md:text-2xl'>
            {place.price} BGN
          </p>
        </div>
      </div>
    </div>
  </Link>
);

export default PlaceCard;
