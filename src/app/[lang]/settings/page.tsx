import { useTranslations } from 'next-intl';
import ChangeTheme from '@/components/settings/theme';
import ChangeLanguage from '@/components/settings/language';

const SettingsPage = () => {
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
