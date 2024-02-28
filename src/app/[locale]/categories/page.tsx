import { API_URL } from '@/configs/api';
import CategoriesPartial from '@/partials/category.partial';

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

const CategoriesPage = async () => {
  const listingCategories = await getCategories('LISTING');
  const placeCategories = await getCategories('PLACE');

  if (!listingCategories || !placeCategories) {
    return <div>Failed to load categories</div>;
  }

  return (
    <div className='grid w-full max-w-screen-2xl grid-cols-1 content-start gap-4 lg:grid-cols-2'>
      <CategoriesPartial title={'Equipment'} data={listingCategories} />
      <CategoriesPartial title={'Places'} data={placeCategories} />
    </div>
  );
};

export default CategoriesPage;
