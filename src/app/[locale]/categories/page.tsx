import { useLocale, useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

const CategoriesPage = () => {
  const locale = useLocale();
  unstable_setRequestLocale(locale);

  const t = useTranslations('categories');
  return <div>{t('title')}</div>;
};

export default CategoriesPage;
