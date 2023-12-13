import { useTranslations } from 'next-intl';

const CategoriesPage = () => {
  const t = useTranslations('categories');
  return <div>{t('title')}</div>;
};

export default CategoriesPage;
