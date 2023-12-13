'use client';

import { useLocale, useTranslations } from 'next-intl';
import { locales } from '@/constants/locales';

const ChangeLanguage = () => {
  const t = useTranslations('settings');
  const locale = useLocale();

  const changeLanguage = (lang: string) => {
    if (!locales.includes(lang)) return null;

    const url = window.location.href.split('/');
    url[3] = lang;

    const newUrl = url.join('/');
    window.location.replace(newUrl);
  };

  return (
    <div className='flex w-full flex-col items-center justify-center'>
      <h2 className='text-4xl font-bold'>{t('change_language')}</h2>
      <div className='flex w-full flex-row items-center justify-center'>
        {locales.map((lang) => (
          <button
            key={lang}
            className={`${
              lang === locale ? 'bg-primary' : 'bg-secondary'
            } m-2 rounded-md px-4 py-2 text-text`}
            onClick={() => changeLanguage(lang)}
          >
            {lang}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChangeLanguage;
