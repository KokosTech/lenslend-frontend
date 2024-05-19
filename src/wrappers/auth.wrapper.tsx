import { ReactNode } from 'react';
import Link from 'next/link';
import LogoComponent from '@/components/navigation/logoComponent';
import VerticalDivider from '@/components/verticalDivider';

const AuthWrapper = ({
  children,
  title,
  alt: { href, text, action },
}: {
  children: ReactNode;
  title: string;
  alt: {
    href: string;
    text: string;
    action: string;
  };
}) => (
  <>
    <div className='flex w-full flex-col gap-4 rounded-xl border border-stroke bg-primary px-8 py-6 font-semibold sm:w-fit'>
      <Link className='flex items-center justify-center gap-2' href={'/'}>
        <LogoComponent />
        <VerticalDivider />
        <h3 className='text-2xl font-bold text-text'>{title}</h3>
      </Link>
      {children}
    </div>
    <Link href={href}>
      {text} <u>{action}</u>
    </Link>
  </>
);

export default AuthWrapper;
