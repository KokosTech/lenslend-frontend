import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { API_URL } from '@/configs/api';
import CategoryTitle from '@/components/common/cateogry-title';
import Link from 'next/link';

type Category = {
  uuid: string;
  name: string;
  sub_categories: Category[];
};

const getCategories = async (type: string) => {
  const res = await fetch(`${API_URL}/category/${type}`, {
    next: {
      revalidate: 60,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  return (await res.json()) as Category[];
};

const CategoriesPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('categories');

  const listingCategories = await getCategories('LISTING');
  const placeCategories = await getCategories('PLACE');

  if (!listingCategories || !placeCategories) {
    return <div>Failed to load categories</div>;
  }

  return (
    <div className='grid w-full max-w-screen-2xl grid-cols-1 content-start gap-4 lg:grid-cols-2'>
      <div className='flex h-fit w-full flex-col gap-4'>
        <CategoryTitle title={t('listing')} />
        {listingCategories.map((category: Category) => (
          <CategoryCard key={category.uuid} type={'listing'} {...category} />
        ))}
      </div>
      <div className='flex w-full flex-col gap-4'>
        <CategoryTitle title={t('place')} />
        {placeCategories.map((category: Category) => (
          <CategoryCard key={category.uuid} type={'places'} {...category} />
        ))}
      </div>
    </div>
  );
};

const CategoryCard = ({
  uuid,
  type,
  name,
  sub_categories,
}: {
  type: string;
} & Category) => (
  <div className='flex flex-col gap-4 rounded-lg border border-stroke p-4'>
    <Link href={`${type}/category/${uuid}`} className='text-xl font-bold'>
      {name}
    </Link>
    {sub_categories?.map((category: Category) => (
      <CategoryCard {...category} type={type} key={category.uuid} />
    ))}
  </div>
);

export default CategoriesPage;
