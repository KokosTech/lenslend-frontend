import type { User } from '@/types/data/place.type';
import Image from 'next/image';
import { IconStar, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

const UserCard = ({ user }: { user: User }) => {
  const locale = useLocale();

  return (
    <Link
      href={`/${locale}/user/${user.username}`}
      className='flex shrink grow-0 cursor-pointer flex-col gap-2 overflow-hidden rounded-xl border border-stroke bg-primary p-2.5 transition-all hover:border-stroke-secondary'
    >
      <div className='relative overflow-hidden rounded-lg border border-stroke'>
        {user.profile_pic ? (
          <Image
            className='aspect-square w-full object-cover'
            src={user.profile_pic}
            width={256}
            height={256}
            alt={user.name}
          />
        ) : (
          <div className='flex aspect-square w-full items-center justify-center'>
            <IconUser className='h-12 w-12' />
          </div>
        )}
        {user.rating !== undefined && user.rating > 0 && (
          <div className='absolute bottom-2 right-2 flex items-center justify-center gap-1 rounded-lg border border-stroke bg-primary/60 p-1.5 px-2 backdrop-blur-lg'>
            <IconStar size={18} />
            <p className='text-white text-sm font-semibold'>{user.rating}</p>
          </div>
        )}
      </div>
      <div className='flex w-full flex-grow flex-col items-center justify-evenly gap-2'>
        <p className='line-clamp-2 text-center text-lg font-bold xl:text-xl'>
          {user.name}
        </p>
        <p className='w-fit rounded-xl border border-stroke-secondary bg-stroke px-2 py-1 text-xs font-semibold text-text-secondary xl:text-xs'>
          @{user.username}
        </p>
      </div>
    </Link>
  );
};
export default UserCard;
