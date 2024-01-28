import { unstable_setRequestLocale } from 'next-intl/server';

const CreatePage = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  // const t = useTranslations('navigation.create');

  return (
    <div>
      <h1>Create Place</h1>
    </div>
  );
};

export default CreatePage;
