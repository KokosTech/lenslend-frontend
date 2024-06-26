'use client';

import { getAuth } from '@/actions/auth';
import HorizontalDivider from '@/components/horizontalDivider';
import { ReviewClient } from '@/components/place/review';
import { API_URL } from '@/configs/api';
import PublishReviewPlace from '@/partials/places/place/publishReview.place';
import { Review } from '@/types/data/place.type';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

const yourReviewFetcher = async (tags: string[], url: string) => {
  const auth = await getAuth('ssr');
  if (!auth) {
    return null;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    next: {
      tags,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    throw new Error(`Couldn't fetch your review ${response.status}`);
  }

  return (await response.json()) as Review;
};

const YourReviewPlace = ({ uuid }: { uuid: string }) => {
  const { mutate } = useSWRConfig();
  const [hasReview, setHasReview] = useState<boolean>(false);

  const t = useTranslations('place.reviews');
  const fetcher = yourReviewFetcher.bind(null, [
    `/place/${uuid}/review/my-review`,
  ]);

  const {
    data: review,
    error,
    isLoading,
  }: {
    data: Review | null | undefined;
    error: undefined;
    isLoading: boolean;
  } = useSWR(`${API_URL}/place/${uuid}/review/my-review`, {
    fetcher,
  });

  useEffect(() => {
    if (hasReview && !review) {
      mutate(`${API_URL}/place/${uuid}/review/my-review`)
        .then((r) => {
          console.log('mutate', r);
        })
        .catch((e) => {
          console.error('mutate error', e);
        });
    }
  }, [hasReview, review]);

  if (isLoading) {
    return null;
  }

  if (error) {
    console.error('Error fetching your review', error);
    return <div>Error:</div>;
  }

  if (!review) {
    return <PublishReviewPlace placeUuid={uuid} setHasReview={setHasReview} />;
  }

  if (review || hasReview) {
    return (
      <div className='flex flex-col gap-4'>
        <h4 className='text-xl font-semibold text-text'>{t('your_review')}</h4>
        <ReviewClient {...review} />
        <HorizontalDivider />
      </div>
    );
  }
};

export default YourReviewPlace;
