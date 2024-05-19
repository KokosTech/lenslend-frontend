import { Suspense } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import CategoriesPartial from '@/partials/category.partial';
import { Metadata, ResolvingMetadata } from 'next';

const CategoriesPage = ({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) => {
  unstable_setRequestLocale(locale);

  return (
    <div className='grid w-full max-w-screen-2xl grid-cols-1 content-start gap-4 lg:grid-cols-2'>
      <Suspense fallback={<div>Loading listing categories...</div>}>
        <CategoriesPartial title={'Equipment'} type='LISTING' />
      </Suspense>
      <Suspense fallback={<div>Loading place categories...</div>}>
        <CategoriesPartial title={'Places'} type='PLACES' />
      </Suspense>
    </div>
  );
};

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
    title: t('categories'),
  };
}

export default CategoriesPage;
