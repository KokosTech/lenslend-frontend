'use client';

import useSWR from 'swr';
import { useState } from 'react';

import DropdownInput from '@/components/common/dropdown.input';

import fetcher from '@/utils/fetcher';

type Category = {
  uuid: string;
  name: string;
  sub_categories: Category[];
};

const Options = ({
  category,
  onChange,
  setShow,
}: {
  category: Category;
  onChange: (category: { uuid: string; name: string }) => void;
  setShow: (show: boolean) => void;
}) => (
  <>
    <div className='flex flex-col gap-2 rounded-md border border-stroke p-2'>
      <div className='flex items-center justify-between'>
        <span className='text-lg font-bold'>{category.name}</span>
        <button
          onClick={() => {
            onChange(category);
            setShow(false);
          }}
          type='button'
          className='rounded px-4 py-2 font-bold transition-colors duration-200 ease-in-out hover:text-blue'
        >
          Select
        </button>
      </div>
      {category.sub_categories && category.sub_categories.length > 0 && (
        <div className='flex flex-col gap-2'>
          {category?.sub_categories?.map((subcategory) => (
            <Options
              key={subcategory.uuid}
              category={subcategory}
              onChange={onChange}
              setShow={setShow}
            />
          ))}
        </div>
      )}
    </div>
  </>
);

const CategorySelect = ({
  value,
  placeholder,
  errors,
  onChange,
}: {
  value: string;
  placeholder: string;
  errors: string[];
  onChange: (category: { uuid: string; name: string }) => void;
}) => {
  const [show, setShow] = useState(false);

  const {
    data: categories,
    error,
    isLoading,
  }: {
    data: Category[] | undefined;
    error: undefined;
    isLoading: boolean;
  } = useSWR('/category/LISTING', {
    fetcher: fetcher<Category[]>,
    keepPreviousData: true,
  });

  return (
    <DropdownInput
      value={value}
      dropdownOptions={[]}
      id={'category'}
      name={'category'}
      type={'text'}
      placeholder={placeholder}
      errors={errors}
      show={show}
      setShow={setShow}
    >
      {isLoading && (
        <div className='absolute right-0 top-16 z-50 w-full rounded-lg border border-stroke bg-primary p-2 text-center'>
          <span>Loading categories...</span>
        </div>
      )}
      {error && (
        <div className='absolute right-0 top-16 z-50 w-full rounded-lg border border-stroke bg-primary p-2 text-center'>
          <span>Error loading categories...</span>
        </div>
      )}
      {categories && categories.length > 0 ? (
        <div className='absolute right-0 top-16 z-50 w-full rounded-lg border border-stroke bg-primary'>
          <div className='flex flex-col gap-2 p-2'>
            {categories.map((category) => (
              <Options
                key={category.uuid}
                category={category}
                onChange={onChange}
                setShow={setShow}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className='absolute right-0 top-16 z-50 w-full rounded-lg border border-stroke bg-primary p-2 text-center'>
          <span>Loading categories...</span>
        </div>
      )}
    </DropdownInput>
  );
};

export default CategorySelect;
