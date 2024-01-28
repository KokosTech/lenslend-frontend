import { unstable_setRequestLocale } from 'next-intl/server';

const FavoritesPage = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
  return <div>Favorites Page</div>;
};

export default FavoritesPage;
