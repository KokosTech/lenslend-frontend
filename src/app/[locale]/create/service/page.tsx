import { unstable_setRequestLocale } from 'next-intl/server';

const CreateServicePage = ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
  // const { t } = useTranslation();
  // const { locale } = useRouter();
  // <Layout title={t('createService')} description={t('createServiceDescription')}>
  //     //   <CreateService />
  //     // </Layout>
  return (
    <div>
      <h1>Create Service</h1>
    </div>
  );
};

export default CreateServicePage;
