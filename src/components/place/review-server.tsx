import Image from 'next/image';
import Link from 'next/link';

import Dates from '@/components/common/dates';

import type { Review as ReviewType } from '@/types/data/place.type';

const ReviewServer = ({
  uuid,
  user,
  content,
  created_at,
  updated_at,
}: ReviewType) => (
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
    <div className='flex flex-col gap-2 px-2'>
      <p className='text-text-text'>{content}</p>
      <Dates created_at={created_at} updated_at={updated_at} />
    </div>
  </div>
);

export default ReviewServer;
