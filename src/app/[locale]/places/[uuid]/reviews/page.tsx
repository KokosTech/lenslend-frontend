import { API_URL } from '@/configs/api';
import { Review as ReviewType } from '@/types/data/place.type';
import { ReviewServer } from '@/components/place/review';
import BackButton from '@/components/common/buttons/backButton';
import { unstable_setRequestLocale } from 'next-intl/server';

const getReviews = async (uuid: string) => {
  const response = await fetch(`${API_URL}/place/${uuid}/review`, {
    cache: 'no-cache',
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    throw new Error(`Couldn't fetch reviews ${response.status}`);
  }

  return (await response.json()) as ReviewType[];
};

const ReviewsPage = async ({
  params: { uuid, locale },
}: {
  params: { uuid: string; locale: string };
}) => {
  unstable_setRequestLocale(locale);

  const reviews: ReviewType[] | null = await getReviews(uuid);

  if (!reviews) {
    return <p>No reviews</p>;
  }

  return (
    <div className='flex justify-center'>
      <div className='flex max-w-2xl flex-col items-center gap-4'>
        <div className='flex items-center justify-center gap-4'>
          <BackButton className='' />
          <h4 className='text-2xl font-semibold text-text'>Reviews</h4>
        </div>
        {reviews.map((review) => (
          <ReviewServer {...review} key={review.uuid} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
