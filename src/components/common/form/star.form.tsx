'use client';

import { useEffect, useState } from 'react';
import StarInput from '@/components/common/star.input';
import { API_URL } from '@/configs/api';
import { getAuth } from '@/actions/auth';
import { rate } from '@/actions/rating';
import HorizontalDivider from '@/components/horizontalDivider';

const StarForm = ({
  username,
  revalidate,
}: {
  username: string;
  revalidate: string;
}) => {
  const [rating, setRating] = useState(0);
  const [showRatingFrom, setShowRatingForm] = useState(false);

  useEffect(() => {
    const fetchRating = async () => {
      const auth = await getAuth('client');

      if (!auth) {
        setShowRatingForm(false);
        return;
      }

      setShowRatingForm(true);

      const res = await fetch(`${API_URL}/user/rate/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: auth,
        },
      });

      if (!res.ok) {
        return;
      }

      try {
        const data = (await res.json()) as { rating: number };

        if (data) {
          setRating(data.rating);
        }
      } catch (error) {
        setRating(0);
      }
    };

    void fetchRating();
  }, [username]);

  if (!showRatingFrom) {
    return null;
  }

  return (
    <div className='flex flex-col gap-2'>
      <HorizontalDivider />
      <StarInput
        value={rating}
        onChange={async (value) => {
          setRating(value);
          await rate(username, value, revalidate);
        }}
      />
    </div>
  );
};

export default StarForm;
