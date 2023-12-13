import { useLocale } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

const UserPage = () => {
  const locale = useLocale();
  unstable_setRequestLocale(locale);

  return <div>User Page</div>;
};

export default UserPage;
