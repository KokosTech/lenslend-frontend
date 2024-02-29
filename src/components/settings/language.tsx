'use client';

import { useLocale, useTranslations } from 'next-intl';
import { locales } from '@/constants/locales';
import { usePathname, useRouter } from 'next/navigation';

const ChangeLanguage = () => {
  const t = useTranslations('settings');
  const locale = useLocale();

  const router = useRouter();
  const path = usePathname();

  const changeLanguage = (lang: string) => {
    if (!locales.includes(lang)) return null;

    const url = path.split('/');
    url[1] = lang;
    const newUrl = url.join('/');

    router.push(newUrl);
  };

  return (
    <div className='flex w-full flex-wrap items-center justify-between rounded-xl border border-stroke bg-primary px-4 py-2'>
      <p className='m-2 break-keep font-semibold text-text'>
        {t('change_language')}
      </p>
      <div className='flex flex-row items-center justify-center'>
        {locales.map((lang, i) => (
          <LangComponent
            key={lang}
            lang={lang}
            selected={lang === locale}
            changeLanguage={changeLanguage}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

const LangComponent = ({
  lang,
  selected,
  changeLanguage,
  i,
}: {
  lang: string;
  selected: boolean;
  changeLanguage: (lang: string) => void;
  i: number;
}) => (
  <>
    <button
      className={`${
        selected
          ? 'border !border-stroke-secondary bg-stroke'
          : 'bg-secondary hover:border-stroke-secondary hover:bg-stroke'
      } m-2 rounded-md border border-stroke px-4 py-2 text-text transition-all duration-300 ease-in-out`}
      onClick={() => changeLanguage(lang)}
    >
      {lang}
    </button>
    {i !== locales.length - 1 && <div className='h-6 w-[2px] bg-stroke' />}
  </>
);

export default ChangeLanguage;
