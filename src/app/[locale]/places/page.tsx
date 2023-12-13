import { useLocale } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

const PlacesPage = () => {
  const locale = useLocale();
  unstable_setRequestLocale(locale);
  return <div>PlacesPage</div>;
};

export default PlacesPage;
