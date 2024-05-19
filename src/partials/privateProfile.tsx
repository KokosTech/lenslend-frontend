import Image from 'next/image';
import {
  IconCake,
  IconEdit,
  IconMail,
  IconPassword,
  IconPhoneCall,
  IconTrash,
  IconUserHexagon,
} from '@tabler/icons-react';
import HorizontalDivider from '@/components/horizontalDivider';
import { Suspense } from 'react';
import DateComponent from '@/components/common/date';
import { UserProfile } from '@/types/data/user.type';

const PrivateProfile = ({ user }: { user: UserProfile }) => {
  const {
    name,
    username,
    bio,
    phone,
    profile_pic,
    header_pic,
    email,
    date_of_birth,
  } = user;

  return (
    <div className='flex h-fit w-full flex-col items-center gap-4 sm:w-fit lg:sticky lg:-top-14 lg:pt-16'>
      <div className='relative flex flex-col gap-2 rounded-xl border-2 border-stroke bg-primary p-2 text-justify'>
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
          <button className='text-md space-pre-wrap flex justify-center rounded-lg bg-blue/90 px-4 py-2 font-semibold text-primary hover:bg-blue'>
            <IconEdit className='mr-2' />
            Edit Public info
          </button>
          <button className='text-md space-pre-wrap flex justify-center rounded-lg bg-green/90 px-4 py-2 font-semibold text-primary hover:bg-green'>
            <IconEdit className='mr-2' />
            Edit Private info
          </button>
        </div>
        <HorizontalDivider />
        <div className='flex items-center gap-3 p-4'>
          <IconMail className='size-8' />
          <p className='text-md font-medium'>{email}</p>
        </div>
        <HorizontalDivider />
        <div className='flex items-center gap-3 p-4'>
          <IconPhoneCall className='size-8' />
          <p className='text-md font-medium'>{phone}</p>
        </div>
        <HorizontalDivider />
        <div className='flex items-center gap-3 p-4'>
          <IconCake className='size-8' />
          <p className='text-md font-medium'>
            <Suspense fallback={null}>
              <DateComponent date={date_of_birth} />
            </Suspense>
          </p>
        </div>
        <HorizontalDivider />
        <div className='flex gap-4'>
          <button className='text-md flex w-full items-center justify-center gap-2 rounded-lg border border-stroke px-8 py-4 text-center font-semibold text-text transition-colors duration-200 ease-in-out hover:border-stroke-secondary hover:bg-stroke hover:text-text-important'>
            <IconPassword />
            Change Password
          </button>
        </div>
        <div className='flex gap-4'>
          <button className='text-md flex w-full items-center justify-center gap-2 rounded-lg border border-stroke px-8 py-4 text-center font-semibold text-text transition-colors duration-200 ease-in-out hover:border-stroke-secondary hover:bg-stroke hover:text-text-important'>
            <IconTrash />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivateProfile;
