import { useLocale } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Search from '@/partials/common/seatch';

const SearchPage = ({
  searchParams: { search, category },
}: {
  searchParams: {
    search: string;
    category?: string;
  };
}) => {
  const locale = useLocale();
  unstable_setRequestLocale(locale);

  return (
    <div className='flex flex-col gap-4 py-10'>
      <Search />
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Search results for {search}</h1>
        <p>Category: {category}</p>
      </div>
    </div>
  );
};

export default SearchPage;
