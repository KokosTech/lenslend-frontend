'use client';

import dynamic from 'next/dynamic';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { isAuth as isAuthF } from '@/actions/auth';

import HorizontalDivider from '@/components/horizontalDivider';
import LogoComponent from '@/components/navigation/logoComponent';
import NavigationComponent from '@/components/navigation/navigationComponent';
import VerticalDivider from '@/components/verticalDivider';

import { navigation, noNavigation } from '@/constants/navigation';

const Navigation = () => {
  const pathname = usePathname();
  const [parent] = useAutoAnimate({
    duration: 300,
    easing: 'ease-in-out',
  });

  const [show, setShow] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    isAuthF()
      .then((auth) => setIsAuth(auth))
      .catch(() => setIsAuth(false));
  }, [pathname]);

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
          fixed h-screen w-60 overflow-y-auto bg-background text-sm font-semibold text-text md:fixed md:left-0
          ${show ? 'flex' : 'hidden md:flex'}
          `}
      >
        <div className='flex w-full flex-col gap-8 px-4 py-8'>
          <LogoComponent onClick={() => setShow(!show)} />
          {navigation.map(({ icon, text, href, auth }) => {
            if ((auth && !isAuth) || (auth === false && isAuth)) return null;
            if (!href) return <HorizontalDivider key={text} />;

            return (
              <NavigationComponent
                key={href}
                icon={icon}
                text={text}
                href={href}
                auth={auth}
                selected={(pathname.replace(/^\/\w{2}/, '') || '/') === href}
                close={() => setShow(false)}
              />
            );
          })}
        </div>
        <div className='h-full py-4'>
          <VerticalDivider />
        </div>
      </nav>
      <div className='md:pl-60' />
    </div>
  );
};

export default dynamic(() => Promise.resolve(Navigation), {
  ssr: false,
});
