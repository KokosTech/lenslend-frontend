'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import type { Review as ReviewType } from '@/types/data/place.type';
import Dates from '@/components/project/client/dates';
import { useTranslations } from 'next-intl';

const ReviewClient = ({
  uuid,
  user,
  content,
  created_at,
  updated_at,
}: ReviewType) => {
  const t = useTranslations('place.reviews');
  const [showFull, setShowFull] = useState(false);

  return (
    <div
      key={uuid}
      className='flex flex-col justify-center gap-2 rounded-xl border border-stroke bg-primary p-4'
    >
      <Link href={`/user/${user.uuid}`} className='flex items-center gap-2'>
        {user.profile_pic && (
          <div className='relative h-14 w-14 overflow-hidden rounded-full border border-stroke'>
            <Image
              src={user.profile_pic}
              alt={user.name}
              layout='fill'
              className='object-cover object-center'
            />
          </div>
        )}
        <div className='flex flex-col items-start'>
          <p className='text-lg font-semibold'>{user.name}</p>
          <p className='text-center text-sm font-medium text-text-secondary'>
            @{user.username}
          </p>
        </div>
      </Link>
      <p className='text-text-text px-2'>
        {showFull ? content : content.slice(0, 100)}
        {content.length > 100 && (
          <button
            className='text-text-secondary hover:text-text-important focus:outline-none'
            onClick={() => setShowFull((prev) => !prev)}
          >
            {showFull ? t('show_less') : t('show_more')}
          </button>
        )}
        <Dates created_at={created_at} updated_at={updated_at} />
      </p>
    </div>
  );
};

export default ReviewClient;
