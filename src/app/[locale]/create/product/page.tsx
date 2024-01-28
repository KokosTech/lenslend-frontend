'use client';

import Input from '@/components/common/input';
import { ChangeEvent, useState } from 'react';
import { isEmpty, toInteger } from 'lodash';
import { IconX } from '@tabler/icons-react';

type Form = {
  name: string;
  description: string;
  type: 'PRODUCT' | 'SERVICE';
  price?: number;
  rental?: number;
  negotiable: boolean;
  status: 'PUBLIC' | 'PRIVATE';
  categoryId: string;
  images: string[];
  tags: string[];
};

const CreateProductPage = () => {
  const [form, setForm] = useState<Form>({
    name: '',
    description: '',
    type: 'PRODUCT',
    price: undefined,
    rental: undefined,
    negotiable: false,
    status: 'PUBLIC',
    categoryId: '',
    images: [],
    tags: [],
  });

  const [tagText, setTagText] = useState<string>('');

  const handleAddTag = (tag: string) => {
    if (form.tags.includes(tag) || isEmpty(tag)) return;
    setForm((prevState) => ({
      ...prevState,
      tags: [...prevState.tags, tag],
    }));
  };

  const handleTagTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagText(e.target.value);

    if (!e.target.value.includes(',')) return;

    const tags = e.target.value.split(',');
    tags.map((tag) => handleAddTag(tag));
    setTagText('');
  };

  return (
    <div>
      <h1>Create Product Page</h1>
      <form>
        <Input
          id={'name'}
          name={'name'}
          type={'text'}
          placeholder='Name'
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />
        <Input
          id='Description'
          name='Description'
          type='text'
          placeholder='Description'
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />
        {/* <Input*/}
        {/*  id={'type'}*/}
        {/*  name={'type'}*/}
        {/*  type={'text'}*/}
        {/*  placeholder='Type'*/}
        {/*  value={form.type}*/}
        {/*  onChange={(e) => setForm({ ...form, type: e.target.value })}*/}
        {/* />*/}
        <Input
          id={'price'}
          name={'price'}
          type={'number'}
          placeholder='Price'
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price: toInteger(e.target.value) || undefined,
            })
          }
        />
        {/* toggle*/}
        <label className='relative inline-flex cursor-pointer items-center'>
          <input
            type='checkbox'
            checked={form.negotiable}
            className='peer sr-only'
            onChange={(e) =>
              setForm({
                ...form,
                negotiable: e.target.checked,
              })
            }
          />
          <div className="peer-focus:ring-blue-300 peer-checked:after:border-white after:bg-white peer h-6 w-11 rounded-full border-stroke bg-primary transition-colors duration-500 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-stroke after:transition-all after:content-[''] peer-checked:bg-blue peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full"></div>
        </label>
        {/* <Input*/}
        {/*  id={'negotiable'}*/}
        {/*  name={'negotiable'}*/}
        {/*  type={'boolean'}*/}
        {/*  placeholder='Negotiable'*/}
        {/*  value={form.negotiable}*/}
        {/*  onChange={(e) => setForm({ ...form, negotiable: e.target.value })}*/}
        {/* />*/}
        <Input
          id={'status'}
          name={'status'}
          type={'text'}
          placeholder='Status'
          value={form.status}
          onChange={(e) =>
            setForm({
              ...form,
              status: e.target.value === 'PRIVATE' ? 'PRIVATE' : 'PUBLIC',
            })
          }
        />
        <Input
          id={'categoryId'}
          name={'categoryId'}
          type={'text'}
          placeholder='Category Id'
          value={form.categoryId}
          onChange={(e) =>
            setForm({
              ...form,
              categoryId: e.target.value,
            })
          }
        />
        {/* <Input*/}
        {/*  id={'images'}*/}
        {/*  name={'images'}*/}
        {/*  type={'text'}*/}
        {/*  placeholder='Images'*/}
        {/*  value={form.images}*/}
        {/*  onChange={(e) => setForm({ ...form, images: e.target.value })}*/}
        {/* />*/}
        {/* <Input*/}
        {/*  id={'tags'}*/}
        {/*  name={'tags'}*/}
        {/*  type={'text'}*/}
        {/*  placeholder='Tags'*/}
        {/*  value={form.tags}*/}
        {/*  onChange={(e) => setForm({ ...form, tags: e.target.value })}*/}
        {/* />*/}
        <div
          className={
            'flex w-full flex-wrap items-start justify-start gap-2 rounded-xl border border-stroke bg-primary p-2 text-text-secondary'
          }
        >
          {form.tags.map((tag) => (
            <div
              key={tag}
              className={
                'flex items-center justify-center gap-2 rounded-xl border border-stroke bg-primary px-3 py-2 text-text-secondary transition-colors hover:border-stroke-secondary'
              }
            >
              {tag}
              <button
                onClick={() => {
                  setForm((prevState) => ({
                    ...prevState,
                    tags: prevState.tags.filter((t) => t !== tag),
                  }));
                }}
                type={'button'}
              >
                <IconX
                  size={16}
                  className='text-text-secondary transition-colors hover:text-blue'
                />
              </button>
            </div>
          ))}
          <input
            type='text'
            value={tagText}
            onChange={handleTagTextChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const input = e.target as HTMLInputElement;
                const tag = input.value;
                console.log(input.value);
                setTagText('');
                handleAddTag(tag);
                input.value = '';
              } else if (e.key === 'Backspace' && isEmpty(tagText)) {
                e.preventDefault();
                setTagText(form.tags[form.tags.length - 1]);
                setForm((prevState) => ({
                  ...prevState,
                  tags: prevState.tags.slice(0, -1),
                }));
              }
            }}
            className='h-10 grow bg-transparent text-text-secondary outline-none'
          />
        </div>
        <button
          onClick={() => {
            navigator.clipboard
              .writeText(`${form.tags.join(',')},`)
              .then((r) => console.log(r))
              .catch((e) => console.log(e));
          }}
          type={'button'}
          className='bg-blue-500 hover:bg-blue-700 text-white rounded px-4 py-2 font-bold'
        >
          Copy
        </button>
      </form>
    </div>
  );
};
export default CreateProductPage;
