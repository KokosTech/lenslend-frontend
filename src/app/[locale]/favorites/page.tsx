import { useLocale } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

const FavoritesPage = () => {
  const locale = useLocale();
  unstable_setRequestLocale(locale);
  return <div>Favorites Page</div>;
};

export default FavoritesPage;
