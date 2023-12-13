'use client';

import { usePathname } from 'next/navigation';

import HorizontalDivider from '@/components/horizontalDivider';
import LogoComponent from '@/components/navigation/logoComponent';
import NavigationComponent from '@/components/navigation/navigationComponent';
import VerticalDivider from '@/components/verticalDivider';

import { navigation, noNavigation } from '@/constants/navigation';

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className='fixed flex h-screen w-60 overflow-y-auto bg-background text-sm font-semibold text-text'>
      {!noNavigation.includes(pathname) && (
        <div className='flex w-full flex-col gap-4 px-4 py-4'>
          <LogoComponent />
          {navigation.map(({ icon, text, href }) => {
            if (!href) return <HorizontalDivider key={text} />;

            return (
              <NavigationComponent
                key={href}
                icon={icon}
                text={text}
                href={href}
                selected={(pathname.replace(/^\/\w{2}/, '') || '/') === href}
              />
            );
          })}
        </div>
      )}
      <div className='h-full py-4'>
        <VerticalDivider />
      </div>
    </nav>
  );
};

export default Navigation;
