import { useLocale } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

const CreatePage = () => {
  const locale = useLocale();
  unstable_setRequestLocale(locale);
  return <div>Create Page</div>;
};

export default CreatePage;
