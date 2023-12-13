import { useLocale } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

const SearchPage = () => {
  const locale = useLocale();
  unstable_setRequestLocale(locale);

  return (
    <div>
      <h1>Search Page</h1>
    </div>
  );
};

export default SearchPage;
