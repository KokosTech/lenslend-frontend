'use client';

import { ReactNode, useState } from 'react';
import { useTranslations } from 'next-intl';
import CustomIcon from '@/components/common/customIcon';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import Link from 'next/link';

const types = [
  {
    name: 'product',
    icon: 'IconCamera',
  },
  {
    name: 'service',
    icon: 'IconBusinessplan',
  },
  {
    name: 'place',
    icon: 'IconMapPin',
  },
];

const CreateButton = ({
  icon,
  text,
  selected,
  close,
}: {
  icon: ReactNode;
  text: string;
  selected: boolean;
  close: () => void;
}) => {
  const [showContext, setShowContext] = useState(false);
  const t = useTranslations('navigation.create');

  // add auto-animate
  const [parent] = useAutoAnimate({
    duration: 300,
    easing: 'ease-in-out',
  });

  const handleClick = () => {
    setShowContext(!showContext);
  };

  return (
    <div className='w-full pb-10'>
      <button
        className={`relative flex w-full items-center gap-2.5 rounded-lg border px-2.5 py-3.5 ${
          selected || showContext
            ? 'border-stroke bg-primary'
            : 'border-transparent bg-transparent'
        } transition-colors duration-200 ease-in-out hover:border-stroke hover:bg-primary`}
        onClick={handleClick}
        ref={parent}
      >
        {icon}
        <span>{t(text)}</span>
        {showContext && (
          <div className='absolute bottom-16 right-0 flex w-full flex-col gap-4 rounded-lg border border-stroke bg-primary p-2'>
            {types.map(({ name, icon }) => (
              <Link
                key={name}
                href={`/create/${name}`}
                onClick={close}
                className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-stroke bg-primary px-4 py-3 transition-colors hover:border-stroke-secondary'
              >
                <CustomIcon name={icon} className='h-6 w-6 text-text' />
                <p>{t(name)}</p>
              </Link>
            ))}
          </div>
        )}
      </button>
    </div>
  );
};

export default CreateButton;
