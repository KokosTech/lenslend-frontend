import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

const DefaultPlacePage = () => <></>;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'navigation',
  });

  return {
    title: t('places'),
  };
}

export default DefaultPlacePage;
