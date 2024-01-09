import Image from 'next/image';
import Link from 'next/link';

import type { User } from '@/types/data/place.type';

const Visitor = ({ uuid, name, username, profile_pic }: User) => (
  <Link
    href={`/user/${uuid}`}
    className='flex shrink-0 flex-col items-center justify-center gap-2 rounded-xl border border-stroke bg-primary p-2'
  >
    {profile_pic && (
      <div className='relative h-48 w-48 overflow-hidden rounded-lg border border-stroke'>
        <Image
          src={profile_pic}
          alt={name}
          layout={'fill'}
          className='h-48 w-48 rounded-lg object-cover object-center'
        />
      </div>
    )}
    <div>
      <p className='text-lg font-semibold'>{name}</p>
      <p className='text-center text-sm font-medium text-text-secondary'>
        @{username}
      </p>
    </div>
  </Link>
);

export default Visitor;
