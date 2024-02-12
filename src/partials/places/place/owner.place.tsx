import { Place } from '@/types/data/place.type';
import User from '@/components/place/user';
import HorizontalDivider from '@/components/horizontalDivider';
import { useTranslations } from 'next-intl';

const OwnerPlace = ({ place: { owner, creator } }: { place: Place }) => {
  const t = useTranslations('place');

  if (!owner) {
    return null;
  }

  return (
    <>
      {creator.uuid && (
        <div className='flex flex-col gap-4'>
          <h4 className='text-xl font-semibold text-text'>{t('creator')}</h4>
          <div className='flex flex-col gap-4'>
            <User {...creator} />
          </div>
        </div>
      )}
      {owner.uuid && (
        <>
          <HorizontalDivider />
          <div className='flex flex-col gap-4'>
            <h4 className='text-xl font-semibold text-text'>{t('owner')}</h4>
            <div className='flex flex-col gap-4'>
              <User {...owner} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default OwnerPlace;
