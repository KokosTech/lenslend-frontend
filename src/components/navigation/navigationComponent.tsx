import Link from 'next/link';

import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';

const NavigationComponent = ({
  icon,
  text,
  href,
  selected,
}: {
  icon: ReactNode;
  text: string;
  href: string;
  selected: boolean;
}) => {
  const t = useTranslations('navigation');

  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 rounded-lg border px-2.5 py-3.5 ${
        selected
          ? 'border-stroke bg-primary'
          : 'border-transparent bg-transparent'
      } transition-colors duration-200 ease-in-out hover:border-stroke hover:bg-primary`}
    >
      {icon}
      <span>{t(text)}</span>
    </Link>
  );
};

export default NavigationComponent;
