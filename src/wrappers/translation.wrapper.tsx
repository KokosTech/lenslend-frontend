'use client';

import { useState } from 'react';
import { IconLanguage } from '@tabler/icons-react';
import TranslateButton from '@/components/common/buttons/translateButton';
import { useTranslations } from 'next-intl';

const TranslationWrapper = ({
  children,
  text,
  pos,
}: {
  children: React.ReactNode;
  text: string;
  pos?: string;
}) => {
  const [translation, setTranslation] = useState<{
    translation: string;
    src: string;
  } | null>(null);

  const t = useTranslations('common');

  if (translation) {
    if (pos) {
      return (
        <>
          {translation.translation}
          <button
            onClick={() => setTranslation(null)}
            className={`absolute ${pos ?? '-bottom-2 right-0'} flex flex-row items-center justify-center gap-1 break-words rounded-full border border-stroke bg-background p-1 px-2 text-sm text-text hover:border-stroke-secondary hover:bg-stroke hover:text-text-important`}
          >
            <IconLanguage size={20} />
            {t('from')} {translation.src}
          </button>
        </>
      );
    }

    return (
      <p className='text-md relative whitespace-pre-wrap'>
        {translation.translation}
        <button
          onClick={() => setTranslation(null)}
          className={`absolute ${pos ?? '-bottom-2 right-0'} flex flex-row items-center justify-center gap-1 break-words rounded-full border border-stroke bg-background p-1 px-2 text-sm text-text hover:border-stroke-secondary hover:bg-stroke hover:text-text-important`}
        >
          <IconLanguage size={20} />
          {t('from')} {translation.src}
        </button>
      </p>
    );
  }

  return (
    <>
      {children}
      <TranslateButton text={text} setTranslation={setTranslation} pos={pos} />
    </>
  );
};

export default TranslationWrapper;
