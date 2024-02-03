import Image from 'next/image';
import HorizontalDivider from '@/components/horizontalDivider';
import Link from 'next/link';
import {
  IconPhoneCall,
  IconUserCircle,
  IconUserHexagon,
} from '@tabler/icons-react';
import { useLocale, useTranslations } from 'next-intl';

const Profile = ({
  name,
  username,
  bio,
  phone,
  profile_pic,
  header_pic,
}: {
  uuid: string;
  name: string;
  username: string;
  bio?: string;
  phone?: string;
  profile_pic?: string;
  header_pic?: string;
}) => {
  const t = useTranslations('listing');
  const locale = useLocale();

  return (
    <div className='w-full lg:w-fit'>
      <div className='relative flex flex-col rounded-xl border-2 border-stroke bg-primary p-2 text-justify'>
        {profile_pic || header_pic ? (
          <div className='relative flex w-full flex-col gap-2'>
            <div
              className={
                'relative !aspect-[32/9] w-full overflow-hidden rounded-xl border-2 border-stroke object-cover lg:w-80 xl:w-96'
              }
            >
              {header_pic && (
                <Image
                  src={header_pic}
                  alt={name}
                  layout='fill'
                  className='object-cover'
                />
              )}
            </div>
            <div className='relative w-full'>
              <div className='absolute -top-14 left-2 flex aspect-square w-28 items-center justify-center overflow-hidden rounded-full border-2 border-stroke lg:w-24 xl:w-28'>
                {profile_pic ? (
                  <Image
                    className='aspect-square object-cover'
                    src={profile_pic}
                    alt={name}
                    width={128}
                    height={128}
                  />
                ) : (
                  <div className='flex aspect-square h-full w-full items-center justify-center bg-primary'>
                    <IconUserHexagon className='h-16 w-16 text-text-secondary' />
                  </div>
                )}
              </div>
              <div className='pl-32 lg:pl-28 xl:pl-32'>
                <h4 className='break-words text-xl font-bold'>{name}</h4>
                <p className='text-sm text-text-secondary'>@{username}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className='p-2 pb-0'>
            <h4 className='break-words text-xl font-bold'>{name}</h4>
            <p className='text-sm text-text-secondary'>@{username}</p>
          </div>
        )}
        <div className='flex w-full flex-col gap-2 break-words rounded-lg p-2 pt-4 text-left text-text-secondary lg:w-80 lg:pt-2 xl:w-96 xl:pt-4'>
          <HorizontalDivider />
          <p className='whitespace-pre-wrap text-sm'>{bio}</p>
        </div>
        <div className='flex w-full flex-col gap-2 break-words rounded-lg p-2 pt-0 lg:w-80 xl:w-96'>
          <HorizontalDivider />
          <Link
            href={`tel:${phone}`}
            className='text-md space-pre-wrap flex justify-center rounded-lg bg-green/90 px-4 py-2 font-semibold text-primary hover:bg-green'
          >
            <IconPhoneCall className='mr-2' />
            {phone}
          </Link>
          <Link
            href={`/${locale}/user/${username}`}
            className='text-md space-pre-wrap flex justify-center rounded-lg bg-blue/90 px-4 py-2 font-semibold text-primary hover:bg-blue'
          >
            <IconUserCircle className='mr-2' />
            {t('view_profile')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
