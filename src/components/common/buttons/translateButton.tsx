'use client';

import translate from '@/actions/translate';
import { IconLanguage } from '@tabler/icons-react';
import { useLocale } from 'next-intl';
import { TargetLanguageCode } from 'deepl-node';

const TranslateButton = ({
  text,
  setTranslation,
  pos,
}: {
  text: string;
  setTranslation?: ({
    translation,
    src,
  }: {
    translation: string;
    src: string;
  }) => void;
  pos?: string;
}) => {
  const lang = useLocale();

  return (
    <button
      onClick={async () => {
        const translation = await translate(text, lang as TargetLanguageCode);
        if (setTranslation) {
          setTranslation(translation);
        }
      }}
      className={`absolute ${pos ?? '-bottom-2 right-0'} rounded-full border border-stroke bg-background p-1 text-text hover:border-stroke-secondary hover:bg-stroke hover:text-text-important`}
    >
      <IconLanguage size={20} />
    </button>
  );
};

export default TranslateButton;
