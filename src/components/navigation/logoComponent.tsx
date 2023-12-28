import Image from 'next/image';
import React from 'react';

const logoComponent = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className='flex items-center gap-2.5' {...props}>
    <Image
      src='/assets/icons/icon-less.png'
      alt='LensLend Logo'
      width={52}
      height={52}
    />
    <span className='bg-gradient bg-clip-text text-2xl font-black text-transparent'>
      LensLend
    </span>
  </div>
);

export default logoComponent;
