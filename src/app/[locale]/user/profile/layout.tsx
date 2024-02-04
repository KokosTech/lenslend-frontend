'use client';
import { ReactNode, useState } from 'react';

const ProfileLayout = ({
  profile,
  edit,
}: {
  profile: ReactNode;
  edit: ReactNode;
}) => {
  const [editProfile] = useState(false);

  return (
    <div className='flex w-full flex-col justify-center'>
      {editProfile ? edit : profile}
    </div>
  );
};

export default ProfileLayout;
