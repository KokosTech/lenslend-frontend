'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import HorizontalDivider from '@/components/horizontalDivider';
import LogoComponent from '@/components/navigation/logoComponent';
import VerticalDivider from '@/components/verticalDivider';

import { noNavigation } from '@/constants/navigation';
import NavigationOptions from '@/partials/common/navigationOptions';

const Navigation = () => {
  const [show, setShow] = useState(false);
  const [parent] = useAutoAnimate({
    duration: 300,
    easing: 'ease-in-out',
  });

  const pathname = usePathname();

  if (noNavigation.includes(pathname)) return null;

  return (
    <div ref={parent} className='z-50'>
      {!show && (
        <div className='fixed top-0 flex w-full flex-col items-center justify-center gap-4 bg-background pt-4 md:hidden'>
          <LogoComponent onClick={() => setShow(!show)} />
          <HorizontalDivider />
        </div>
      )}
      <nav
        className={`
          ${show ? 'flex' : 'hidden'}
          fixed h-screen w-60 overflow-y-auto bg-background text-sm font-semibold text-text md:fixed md:left-0 md:flex
          `}
      >
        <NavigationOptions setShow={setShow} />
        <div className='h-full py-4'>
          <VerticalDivider />
        </div>
      </nav>
      <div className='md:pl-60' />
    </div>
  );
};

export default Navigation;
