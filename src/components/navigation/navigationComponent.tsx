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
      className={`flex items-center gap-2.5 px-2.5 py-3.5 rounded-lg border ${
        selected
          ? 'bg-primary border-stroke'
          : 'bg-transparent border-transparent'
      } hover:bg-primary hover:border-stroke transition-colors duration-200 ease-in-out`}
    >
      {icon}
      <span>{t(text)}</span>
    </Link>
  );
};

export default NavigationComponent;
