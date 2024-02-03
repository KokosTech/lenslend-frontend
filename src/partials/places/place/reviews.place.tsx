import { Place } from '@/types/data/place.type';
import Link from 'next/link';
import HorizontalDivider from '@/components/horizontalDivider';
import { ReviewClient } from '@/components/place/review';
import { useTranslations } from 'next-intl';

const ReviewsPlace = ({ place: { uuid, reviews } }: { place: Place }) => {
  const t = useTranslations('place.reviews');

  if (!reviews || !reviews.length) {
    return (
      <>
        <div className='flex flex-col gap-2 text-center'>
          {t('none')}{' '}
          <Link
            href={`/places/${uuid}/reviews`}
            className='text-md rounded-lg border border-stroke px-8 py-4 text-center font-semibold text-text transition-colors duration-200 ease-in-out hover:border-stroke-secondary hover:bg-stroke hover:text-text-important'
          >
            {t('first')}
          </Link>
        </div>
        <HorizontalDivider />
      </>
    );
  }

  return (
    <>
      <div className='flex flex-col gap-4'>
        <h4 className='text-xl font-semibold text-text'>{t('title')}</h4>
        {reviews.slice(0, 3).map((review) => (
          <ReviewClient key={review.uuid} {...review} />
        ))}
        <Link
          href={`/places/${uuid}/reviews`}
          className='text-md rounded-lg border border-stroke px-8 py-4 text-center font-semibold text-text transition-colors duration-200 ease-in-out hover:border-stroke-secondary hover:bg-stroke hover:text-text-important'
        >
          {t('read_all')}
        </Link>
      </div>
      <HorizontalDivider />
    </>
  );
};

export default ReviewsPlace;
