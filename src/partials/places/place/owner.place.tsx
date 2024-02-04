import { Place } from '@/types/data/place.type';
import User from '@/components/place/user';
import HorizontalDivider from '@/components/horizontalDivider';
import { useTranslations } from 'next-intl';

const OwnerPlace = ({ place: { owner } }: { place: Place }) => {
  const t = useTranslations('place');

  if (!owner) {
    return null;
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <h4 className='text-xl font-semibold text-text'>{t('owner')}</h4>
        <div className='flex flex-col gap-4'>
          <User {...owner} />
        </div>
      </div>
      <HorizontalDivider />
    </>
  );
};

export default OwnerPlace;
