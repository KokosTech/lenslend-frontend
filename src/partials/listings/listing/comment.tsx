import React from 'react';
import Image from 'next/image';
import { User } from '@/types/data/place.type';
import Dates from '@/components/project/client/dates';

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
  <div className='flex gap-4 rounded-xl border border-stroke bg-primary p-2 text-justify'>
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
      <p className='px-2 text-text'>{content}</p>
      <Dates created_at={created_at} updated_at={updated_at} />
    </div>
  </div>
);

export default Comment;
