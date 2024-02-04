import ChangeLanguage from '@/components/settings/language';
import ChangeTheme from '@/components/settings/theme';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import HorizontalDivider from '@/components/horizontalDivider';

const SettingsPage = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations('settings');

  return (
    <div className='flex flex-1 flex-col gap-4 py-4'>
      <h1 className='text-3xl font-bold'>{t('title')}</h1>
      <HorizontalDivider />
      <ChangeLanguage />
      <ChangeTheme text={t('change_theme')} />
    </div>
  );
};

export default SettingsPage;
