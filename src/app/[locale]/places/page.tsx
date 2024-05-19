import { Metadata, ResolvingMetadata } from 'next';
import { getTranslations } from 'next-intl/server';

const DefaultPlacePage = () => <></>;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
  parent: ResolvingMetadata;
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
