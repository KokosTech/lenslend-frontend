import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

const CategoriesPage = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations('categories');
  return <div>{t('title')}</div>;
};

export default CategoriesPage;
