import { Place } from '@/types/data/place.type';
import Link from 'next/link';
import Visitor from '@/components/place/visitor';
import HorizontalDivider from '@/components/horizontalDivider';
import { useTranslations } from 'next-intl';

const VisitorsPlace = ({ place: { uuid, visitors } }: { place: Place }) => {
  const t = useTranslations('place.visitors');

  if (!visitors?.length) return null;

  return (
    <>
      <div className='flex flex-col gap-4'>
        <h4 className='text-xl font-semibold text-text'>{t('title')}</h4>
        <div className='flex justify-start gap-2 overflow-x-auto'>
          {visitors.map((visitor) => (
            <Visitor key={visitor.uuid} {...visitor.user} />
          ))}
          <Link
            href={`/place/${uuid}/visitors`}
            className='flex shrink-0 flex-col items-center justify-center gap-2 rounded-xl border-2 border-stroke bg-primary p-2 transition-colors duration-200 ease-in-out hover:border-stroke-secondary hover:bg-stroke hover:text-text-important'
          >
            <div className='flex w-48 items-center justify-center rounded-lg'>
              <p className='text-md font-semibold'>{t('view_all')}</p>
            </div>
          </Link>
        </div>
      </div>
      <HorizontalDivider />
    </>
  );
};

export default VisitorsPlace;
