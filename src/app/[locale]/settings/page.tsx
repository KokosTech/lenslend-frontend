import ChangeLanguage from '@/components/settings/language';
import ChangeTheme from '@/components/settings/theme';
import { useLocale, useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

const SettingsPage = () => {
  const locale = useLocale();
  unstable_setRequestLocale(locale);

  const t = useTranslations('settings');

  return (
    <div className='flex flex-1 flex-col items-center justify-center px-4 text-center sm:px-20'>
      <h1 className='text-6xl font-bold'>{t('title')}</h1>
      {/* change language */}
      <ChangeLanguage />
      {/* change theme */}
      <ChangeTheme text={t('change_theme')} />
    </div>
  );
};

export default SettingsPage;
