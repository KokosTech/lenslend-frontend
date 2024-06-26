import { isAuth as isAuthF } from '@/actions/auth';
import HorizontalDivider from '@/components/horizontalDivider';
import LogoComponent from '@/components/navigation/logoComponent';
import NavigationComponent from '@/components/navigation/navigationComponent';
import { navigation } from '@/constants/navigation';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type NavigationOptionsProps = {
  setShow: Dispatch<SetStateAction<boolean>>;
};

const NavigationOptions = ({ setShow }: NavigationOptionsProps) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  const pathname = usePathname();

  useEffect(() => {
    isAuthF('client')
      .then((auth) => setIsAuth(auth !== false))
      .catch(() => setIsAuth(false));
  }, [pathname]);

  return (
    <div className='flex w-full flex-col gap-8 px-4 py-8'>
      <LogoComponent onClick={() => setShow((prev) => !prev)} />
      {navigation.map(({ icon, text, href, auth }) => {
        if (
          (auth === true && isAuth === false) ||
          (auth === false && isAuth === true) ||
          (auth !== undefined && isAuth === null)
        ) {
          return null;
        }
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
      {isAuth === null && (
        <div className='h-96 w-full animate-pulse rounded-lg bg-primary' />
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(NavigationOptions), {
  ssr: false,
});
