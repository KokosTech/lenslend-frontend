'use client';
import { ReactNode, useState } from 'react';

const ProfileLayout = ({
  profile,
  edit,
}: {
  profile: ReactNode;
  edit: ReactNode;
}) => {
  const [editProfile, setEditProfile] = useState(false);

  const handleClick = () => {
    setEditProfile(!editProfile);
  };

  return (
    <div className='flex w-full flex-col justify-center'>
      {editProfile ? edit : profile}
      <button
        className='fixed bottom-10 right-10 flex h-20 w-20 items-center justify-center rounded-full bg-primary text-text-secondary'
        onClick={handleClick}
      >
        {editProfile ? 'Cancel' : 'Edit'}
      </button>
    </div>
  );
};

export default ProfileLayout;
