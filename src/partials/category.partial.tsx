import CategoryTitle from '@/components/common/cateogry-title';
import Link from 'next/link';
import { API_URL } from '@/configs/api';
import { getTranslations } from 'next-intl/server';

type Category = {
  uuid: string;
  name: string;
  sub_categories: Category[];
};

type CategoriesPartialProps = {
  title: string;
  type: 'LISTING' | 'PLACE';
};

const CategoriesPartial = async ({ title, type }: CategoriesPartialProps) => {
  const t = await getTranslations('search.categories');

  const data = await getCategories(type);

  if (!data) {
    return null;
  }

  return (
    <div className='flex w-full flex-col gap-4'>
      <CategoryTitle title={t(title)} />
      {data.map((category: Category) => (
        <CategoryCard
          key={category.uuid}
          type={type.toLowerCase()}
          {...category}
        />
      ))}
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

const getCategories = async (type: string) => {
  const res = await fetch(`${API_URL}/category/${type}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  return (await res.json()) as Category[];
};
export default CategoriesPartial;
