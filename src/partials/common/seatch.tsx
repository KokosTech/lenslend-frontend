'use client';

import {
  IconCameraDollar,
  IconMap,
  IconSearch,
  IconUsers,
} from '@tabler/icons-react';
import { FormEvent, ReactNode, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const CategorySelect = ({
  icon,
  text,
  selected,
  handleCategory,
}: {
  icon: ReactNode;
  text: 'Freelancers' | 'Equipment' | 'Places';
  selected: string | null;
  handleCategory: (category: string) => void;
}) => {
  const t = useTranslations('search.categories');

  return (
    <button
      className={`flex aspect-square h-16 w-full items-center justify-center gap-2 rounded-xl border border-stroke bg-primary p-4 hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none sm:w-fit sm:shrink-0 lg:aspect-auto ${
        selected === text ? 'border-stroke-secondary bg-stroke' : ''
      }`}
      onClick={() => handleCategory(text)}
      type={'button'}
    >
      {icon}
      <span className='hidden font-semibold lg:block'>{t(text)}</span>
    </button>
  );
};

const Search = () => {
  const t = useTranslations('search');

  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState<string | null>(null);

  const handleCategory = (categorySelect: string) => {
    setCategory((prev) => (prev === categorySelect ? null : categorySelect));
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchInput = e.currentTarget.search as HTMLInputElement | undefined;

    if (!searchInput) return;

    const search = searchInput.value;

    if (
      search === searchParams.get('search') &&
      category === searchParams.get('category')
    ) {
      return;
    }

    router.push(
      `/search?search=${search}${category ? `&category=${category}` : ''}`,
    );
  };

  useEffect(() => {
    if (searchParams.get('category')) {
      setCategory(searchParams.get('category'));
    } else {
      setCategory(null);
    }
  }, [searchParams]);

  return (
    <div className='sticky z-20 bg-background py-4 sm:top-0'>
      <form
        className='flex w-full flex-col items-center gap-4 sm:h-16 sm:flex-row'
        onSubmit={handleSearch}
      >
        <div className='flex h-16 w-full items-center gap-4'>
          <input
            className='h-full w-full rounded-xl border border-stroke bg-primary p-4 hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none'
            placeholder={t('placeholder')}
            name='search'
            type='text'
            autoComplete='off'
            required
            id='search'
            defaultValue={searchParams.get('search') || ''}
          />
          <button className='flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-stroke bg-primary p-4 hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none'>
            <IconSearch className='h-12 w-12 font-semibold' />
          </button>
        </div>
        <div className='flex h-16 w-full shrink-0 items-center gap-4 sm:w-fit'>
          <CategorySelect
            icon={<IconMap />}
            text={'Places'}
            selected={category}
            handleCategory={handleCategory}
          />
          <CategorySelect
            icon={<IconCameraDollar />}
            text={'Equipment'}
            selected={category}
            handleCategory={handleCategory}
          />
          <CategorySelect
            icon={<IconUsers />}
            text={'Freelancers'}
            selected={category}
            handleCategory={handleCategory}
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
