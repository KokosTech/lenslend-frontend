import Link from 'next/link';
import { IconHome } from '@tabler/icons-react';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className='flex h-full w-full flex-col items-center justify-center gap-4 text-text'>
    <Link
      href={'/'}
      className={
        'absolute left-5 top-5 rounded-lg border border-stroke bg-primary p-3 text-text-secondary transition-colors hover:border-stroke-secondary hover:text-text-important'
      }
    >
      <IconHome />
    </Link>
    {children}
  </div>
);

export default Layout;
