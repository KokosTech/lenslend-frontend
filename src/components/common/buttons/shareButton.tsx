'use client';

import { IconShare } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const ShareButton = (): JSX.Element => {
  const path = usePathname();
  const t = useTranslations('common');

  const [copied, setCopied] = useState(false);
  // const [pageURL, setPageURL] = useState('');
  // const [isNativeShare, setNativeShare] = useState(false);

  const handleCopy = () => {
    try {
      navigator?.clipboard
        .writeText(`${window.location.origin}${path}`)
        .then(() => setCopied(true))
        .catch((err) => console.error(err));
    } catch (err) {
      console.log(err);
      console.warn('Browser does not support clipboard');
    }

    navigator.canShare({
      title: window.document.title,
      text: window.document.title,
      url: `${window.location.origin}${path}`,
    });

    navigator
      ?.share({
        title: window.document.title,
        text: window.document.title,
        url: `${window.location.origin}${path}`,
      })
      .then(() => console.log('Successful share'))
      .catch((err) =>
        console.warn('Browser does not support native share', err),
      );

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='absolute right-0 top-0 z-10 p-4'>
      <button
        className='flex items-center gap-2 rounded-xl border-2 border-stroke bg-primary px-4 py-2 transition-opacity duration-300 hover:opacity-90'
        onClick={handleCopy}
      >
        <IconShare className='h-6 w-6' />
        <span className='text-sm'>{copied ? t('copied') : t('share')}</span>
      </button>
    </div>
  );
};

export default ShareButton;
