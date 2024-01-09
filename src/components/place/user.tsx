import Link from 'next/link';
import Image from 'next/image';

import type { User as UserType } from '@/types/data/place.type';

const User = ({ uuid, name, username, profile_pic }: UserType) => (
  <Link
    href={`/user/${uuid}`}
    className='flex shrink-0 gap-4 rounded-xl border border-stroke bg-primary p-2'
  >
    {profile_pic && (
      <div className='relative aspect-square h-16 overflow-hidden rounded-lg border border-stroke'>
        <Image
          src={profile_pic}
          alt={name}
          layout='fill'
          className='object-cover object-center'
        />
      </div>
    )}
    <div className='flex flex-col items-start justify-center'>
      <p className='text-lg font-semibold'>{name}</p>
      <p className='text-center text-sm font-medium text-text-secondary'>
        @{username}
      </p>
    </div>
  </Link>
);

export default User;
