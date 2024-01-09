import { useTranslations } from 'next-intl';
import HorizontalDivider from '@/components/horizontalDivider';
import Link from 'next/link';
import ListingActionButtons from '@/wrappers/listingActionButtons';

const ActionsPlace = ({
  uuid,
  ownerUuid,
  userUuid,
  lat,
  lng,
}: {
  uuid: string;
  ownerUuid?: string;
  userUuid: string;
  lat: number;
  lng: number;
}) => {
  const t = useTranslations('place.buttons');

  return (
    <div className='sticky bottom-0 right-0 w-full bg-primary'>
      <div className='flex flex-col gap-4 p-4 pt-0'>
        <HorizontalDivider size={2} />
        <div className='flex h-10 items-center justify-center gap-2 md:h-12'>
          <Link
            className='flex h-full w-full items-center justify-center rounded-lg border border-stroke py-2 text-center font-semibold text-text-important transition-colors duration-200 ease-in-out hover:bg-stroke hover:text-text-important'
            href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
          >
            {t('open_map')}
          </Link>
          <ListingActionButtons
            uuid={uuid}
            userUuid={ownerUuid ?? userUuid}
            addClass='h-full'
          />
        </div>
      </div>
    </div>
  );
};

export default ActionsPlace;
