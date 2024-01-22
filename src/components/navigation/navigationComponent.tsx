import Link from 'next/link';

import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import CreateButton from '@/components/common/buttons/createButton';

const NavigationComponent = ({
  icon,
  text,
  href,
  selected,
  close,
  auth,
}: {
  icon: ReactNode;
  text: string;
  href: string;
  selected: boolean;
  close: () => void;
  auth?: boolean;
}) => {
  const t = useTranslations('navigation');

  if (href.includes('logout') || auth === false) {
    return (
      <a
        href={href}
        className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-3.5 ${
          selected
            ? 'border-stroke bg-primary'
            : 'border-transparent bg-transparent'
        } transition-colors duration-200 ease-in-out hover:border-stroke hover:bg-primary`}
        onClick={close}
      >
        {icon}
        <span>{t(text)}</span>
      </a>
    );
  }

  if (href.includes('create')) {
    return (
      <CreateButton icon={icon} text={text} selected={selected} close={close} />
    );
  }

  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-3.5 ${
        selected
          ? 'border-stroke bg-primary'
          : 'border-transparent bg-transparent'
      } transition-colors duration-200 ease-in-out hover:border-stroke hover:bg-primary`}
      onClick={close}
    >
      {icon}
      <span>{t(text)}</span>
    </Link>
  );
};

export default NavigationComponent;
