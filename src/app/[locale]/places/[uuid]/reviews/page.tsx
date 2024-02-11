import BackButton from '@/components/common/buttons/backButton';
import { ReviewServer } from '@/components/place/review';
import { Review as ReviewType } from '@/types/data/place.type';
import { unstable_setRequestLocale } from 'next-intl/server';
import { paginatedFetch } from '@/utils/paginated-fetch';
import { PaginatedResponse } from '@/types/paginated-response.type';
import { notFound } from 'next/navigation';
import PageOptions from '@/partials/common/pageOptions';

const getReviews = async (
  uuid: string,
  page: number = 1,
  limit: number = 12,
) => {
  const response = await paginatedFetch<ReviewType>(
    `/place/${uuid}/review`,
    page,
    limit,
    {
      cache: 'no-cache',
    },
  );

  if (!response) {
    return null;
  }

  return response;
};

const ReviewsPage = async ({
  params: { uuid, locale },
  searchParams: { page = 1, limit = 12 },
}: {
  params: { uuid: string; locale: string };
  searchParams: { page: number; limit: number };
}) => {
  unstable_setRequestLocale(locale);

  if (Number.isNaN(Number(page)) || Number.isNaN(Number(limit))) {
    return (
      <div>
        <h1>Invalid page or limit</h1>
      </div>
    );
  }

  const reviewsData: PaginatedResponse<ReviewType> | null = await getReviews(
    uuid,
    page,
    limit,
  );

  if (!reviewsData || !uuid) {
    return notFound();
  }

  const { data: reviews, totalCount: totalItems } = reviewsData;

  if (totalItems === 0) {
    return (
      <div>
        <h1>No reviews</h1>
      </div>
    );
  }

  return (
    <div className='flex w-full max-w-2xl flex-col items-center gap-4'>
      <div className='flex items-center justify-center gap-4'>
        <BackButton className='' />
        <h4 className='text-2xl font-semibold text-text'>Reviews</h4>
      </div>
      {reviews.map((review) => (
        <ReviewServer {...review} key={review.uuid} />
      ))}
      <PageOptions page={page} limit={limit} totalItems={totalItems} />
    </div>
  );
};

export default ReviewsPage;
