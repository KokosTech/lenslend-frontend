import { useTranslations } from 'next-intl';
import CategoryTitle from '@/components/common/cateogry-title';
import Link from 'next/link';

type Category = {
  uuid: string;
  name: string;
  sub_categories: Category[];
};

type CategoriesPartialProps = {
  title: string;
  data: Category[];
};

const CategoriesPartial = ({ title, data }: CategoriesPartialProps) => {
  const t = useTranslations('search.categories');

  return (
    <div className='flex w-full flex-col gap-4'>
      <CategoryTitle title={t(title)} />
      {data.map((category: Category) => (
        <CategoryCard
          key={category.uuid}
          type={title === 'Equipment' ? 'listing' : 'place'}
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

export default CategoriesPartial;
