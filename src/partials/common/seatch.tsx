'use client';

import {
  IconCameraDollar,
  IconMap,
  IconSearch,
  IconUsers,
} from '@tabler/icons-react';
import { FormEvent, ReactNode, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const CategorySelect = ({
  icon,
  text,
  selected,
  handleCategory,
}: {
  icon: ReactNode;
  text: string;
  selected: string | null;
  handleCategory: (category: string) => void;
}) => (
  <button
    className={`flex aspect-square h-16 w-full items-center justify-center gap-2 rounded-xl border border-stroke bg-primary p-4 hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none sm:w-fit sm:shrink-0 lg:aspect-auto ${
      selected === text ? 'border-stroke-secondary bg-stroke' : ''
    }`}
    onClick={() => handleCategory(text)}
    type={'button'}
  >
    {icon}
    <span className='hidden font-semibold lg:block'>{text}</span>
  </button>
);

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

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

  return (
    <form
      className='flex flex-col items-center gap-4 sm:h-16 sm:flex-row'
      onSubmit={handleSearch}
    >
      <div className='flex h-16 w-full items-center gap-4'>
        <input
          className='h-full w-full rounded-xl border border-stroke bg-primary p-4 hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none'
          placeholder='what are you looking for today?'
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
  );
};

export default Search;
