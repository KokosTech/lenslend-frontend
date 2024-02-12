import { IconX } from '@tabler/icons-react';
import Link from 'next/link';

const CloseButton = () => (
  <div className='absolute right-6 top-6 w-[50px]'>
    <Link
      href='/places'
      prefetch={false}
      className='fixed z-10 flex items-center justify-center rounded-md border border-stroke bg-primary p-2'
    >
      <IconX className='h-8 w-8 font-black text-text-important transition-colors duration-200 ease-in-out hover:text-blue md:h-7 md:w-7' />
    </Link>
  </div>
);

export default CloseButton;
