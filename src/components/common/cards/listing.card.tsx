import ListingThumbnail from '@/components/common/cards/components/listing.thumbnail';
import Price from '@/components/common/price';
import { ShortListingResponse } from '@/types/data/listing.type';
import { useTranslations } from 'next-intl';
import ListingActionButtons from '@/wrappers/listingActionButtons';
import Link from 'next/link';
import Address from '@/components/common/address';

const ListingCard = ({
  uuid,
  title,
  lat,
  lng,
  price,
  state,
  rental,
  user,
  thumbnail,
  noActions,
}: ShortListingResponse & {
  noActions?: boolean;
}) => {
  const t = useTranslations('listing');

  return (
    <div className='relative flex w-full shrink grow gap-3 rounded-xl border border-stroke bg-primary p-2.5 transition hover:scale-[1.01]'>
      <ListingThumbnail
        image={thumbnail}
        state={t(`state.${state}`).toLowerCase()}
      />
      <div className='flex w-full flex-col justify-between'>
        <div>
          <h3 className='line-clamp-2 text-lg font-semibold sm:text-xl md:text-2xl'>
            {title}
          </h3>
          <p className='md:text-md text-sm font-light text-text-secondary'>
            <Address lat={lat} lng={lng} />
          </p>
        </div>
        <div className='flex w-full items-center justify-between gap-4'>
          <Price price={price} rental={rental} />
          {!noActions && (
            <ListingActionButtons uuid={uuid} userUuid={user.uuid} />
          )}
        </div>
      </div>
      <Link href={`/listing/${uuid}`} className='absolute h-full w-full' />
    </div>
  );
};

export default ListingCard;
