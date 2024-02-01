import type { User } from '@/types/data/place.type';
import Image from 'next/image';
import { IconUser } from '@tabler/icons-react';
import Link from 'next/link';

const UserCard = ({ user }: { user: User }) => (
  <Link
    href={`/user/${user.username}`}
    className='z-50 flex shrink grow-0 cursor-pointer flex-col gap-2 rounded-xl border border-stroke bg-primary p-2.5 transition-all hover:scale-[1.01]'
  >
    {user.profile_pic ? (
      <Image
        className='aspect-square w-full rounded-lg object-cover'
        src={user.profile_pic}
        width={256}
        height={256}
        alt={user.name}
      />
    ) : (
      <div className='aspect-square h-24 w-24 rounded-full border border-stroke'>
        <IconUser className='h-8 w-8' />
      </div>
    )}
    <div className='w-full'>
      <p className='text-lg font-bold xl:text-xl'>{user.name}</p>
      <p className='text-xs font-semibold text-text-secondary xl:text-sm'>
        @{user.username}
      </p>
    </div>
  </Link>
);

export default UserCard;
