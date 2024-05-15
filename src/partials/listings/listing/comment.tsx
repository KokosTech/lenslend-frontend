import React from 'react';
import Image from 'next/image';
import { User } from '@/types/data/place.type';
import Dates from '@/components/common/dates';
import TranslationWrapper from '@/wrappers/translation.wrapper';

const Comment = ({
  user,
  content,
  created_at,
  updated_at,
}: {
  user: User;
  content: string;
  created_at: string;
  updated_at: string;
}) => (
  <div className='relative flex gap-4 rounded-xl border border-stroke bg-primary p-2 text-justify'>
    <div className='flex flex-col gap-2 px-2'>
      <div className='flex items-center gap-2'>
        {user.profile_pic && (
          <div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-stroke'>
            <Image
              src={user.profile_pic}
              alt='profile_pic'
              className='object-cover object-center'
              layout='fill'
            />
          </div>
        )}
        <div className='flex flex-col'>
          <p className='font-semibold'>{user.name}</p>
          <p className='text-xs text-text-secondary'>@{user.username}</p>
        </div>
      </div>
      <TranslationWrapper text={content} pos='bottom-2 right-2'>
        <p className='whitespace-pre-line px-2 font-semibold text-text'>
          {content}
        </p>
      </TranslationWrapper>
      <Dates created_at={created_at} updated_at={updated_at} />
    </div>
  </div>
);

export default Comment;
