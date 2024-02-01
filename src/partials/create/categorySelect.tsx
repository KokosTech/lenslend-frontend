'use client';

import React, { useEffect, useState } from 'react';
import Input from '@/components/common/input';
import { IconChevronDown } from '@tabler/icons-react';
import { API_URL } from '@/configs/api';

type Category = {
  uuid: string;
  name: string;
  sub_categories: Category[];
};

const CategorySelect = ({
  value,
  errors,
  onChange,
}: {
  value: string;
  errors: string[];
  onChange: (category: { uuid: string; name: string }) => void;
}) => {
  const [show, setShow] = useState(false);
  // ref if clicked outside
  const ref = React.useRef<HTMLDivElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);

  const handleClick = () => {
    setShow(!show);
  };

  // close if clicked outside
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        show &&
        ref.current &&
        e.target instanceof Node &&
        !ref.current.contains(e.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [show]);

  useEffect(() => {
    const getCategories = async () => {
      const res = await fetch(`${API_URL}/category/LISTING`);
      const data = (await res.json()) as Category[];
      console.log(data);
      setCategories(data);
    };

    getCategories();
  }, []);

  return (
    <>
      <div className='relative w-full grow' ref={ref}>
        <Input
          id={'category'}
          name={'category'}
          type={'text'}
          placeholder='Category'
          value={value}
          addClass='!max-w-none !w-full'
          required={true}
          readOnly={true}
          errors={errors}
        />
        <button
          onClick={handleClick}
          className='absolute bottom-2 right-2 rounded px-4 py-2 font-bold transition-colors duration-200 ease-in-out hover:text-blue'
        >
          <IconChevronDown size={24} />
        </button>
        {show && categories && (
          <div className='absolute right-0 top-16 z-50 w-full rounded-lg border border-stroke bg-primary'>
            <div className='flex flex-col gap-2 p-2'>
              {categories?.map((category) => (
                <div
                  key={category.uuid}
                  className='flex flex-col gap-2 rounded-lg border border-stroke bg-primary p-2'
                >
                  <div className='flex items-center justify-between'>
                    <span className='text-lg font-bold'>{category.name}</span>
                    <button
                      onClick={() => {
                        onChange(category);
                        setShow(false);
                      }}
                      className='rounded px-4 py-2 font-bold transition-colors duration-200 ease-in-out hover:text-blue'
                    >
                      Select
                    </button>
                  </div>
                  <div className='flex flex-col gap-2 rounded-lg border border-stroke bg-primary p-2'>
                    {category?.sub_categories?.map((subcategory) => (
                      <>
                        <div
                          key={subcategory.uuid}
                          className='flex items-center justify-between'
                        >
                          <span className='text-lg font-bold'>
                            {subcategory.name}
                          </span>
                          <button
                            onClick={() => {
                              onChange(subcategory);
                              setShow(false);
                            }}
                            className='rounded px-4 py-2 font-bold transition-colors duration-200 ease-in-out hover:text-blue'
                          >
                            Select
                          </button>
                        </div>
                        {subcategory?.sub_categories?.map((subsubcategory) => (
                          <div
                            key={subsubcategory.uuid}
                            className='flex items-center justify-between'
                          >
                            <span className='text-lg font-bold'>
                              {subsubcategory.name}
                            </span>
                            <button
                              onClick={() => {
                                onChange(subsubcategory);
                                setShow(false);
                              }}
                              className='rounded px-4 py-2 font-bold transition-colors duration-200 ease-in-out hover:text-blue'
                            >
                              Select
                            </button>
                          </div>
                        ))}
                      </>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CategorySelect;
