'use client';

import Input from '@/components/common/input';
import React, { ChangeEvent, useState } from 'react';
import { isEmpty, toInteger } from 'lodash';
import {
  IconCopy,
  IconCurrencyDollar,
  IconDiscount2,
  IconX,
} from '@tabler/icons-react';
import HorizontalDivider from '@/components/horizontalDivider';
import ImageInput from '@/app/[locale]/create/product/image.input';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import Address from '@/components/common/address';
import CategorySelect from '@/partials/create/categorySelect';
import StatusSelect from '@/partials/create/statusSelect';
import { getAuth } from '@/actions/auth';
import { API_URL } from '@/configs/api';

type Form = {
  name: string;
  description: string;
  type: 'PRODUCT' | 'SERVICE';
  price?: number;
  rental: boolean;
  negotiable: boolean;
  status: 'PUBLIC' | 'PRIVATE';
  category: {
    uuid: string;
    name: string;
  };
  images: {
    url: string;
    order: number;
  }[];
  tags: string[];
};

const CreateProductPage = () => {
  const [form, setForm] = useState<Form>({
    name: '',
    description: '',
    type: 'PRODUCT',
    price: undefined,
    rental: false,
    negotiable: false,
    status: 'PUBLIC',
    category: {
      uuid: '',
      name: '',
    },
    images: [],
    tags: [],
  });

  const [tagText, setTagText] = useState<string>('');
  const [selectLocation, setSelectLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const [errors, setErrors] = useState<string[]>([]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = await getAuth();
    if (!token) {
      setErrors(['You need to be logged in to create a listing']);
      return;
    }

    console.log(form);
    console.log(token);

    //   for each image get signed url to upload to s3
    // const signedUrls = await Promise.all(
    //   form.images.map(async (image) => {
    //     const res = await fetch(
    //       `${API_URL}/upload?filename=${image}&type=${'jpeg'}&acl=${form.status === 'PUBLIC' ? 'public-read' : 'private'}`,
    //       {
    //         headers: {
    //           Authorization: token,
    //         },
    //       },
    //     );
    //     const data = (await res.json()) as {
    //       url: string;
    //       key: string;
    //       public_url: string;
    //     };
    //     console.log(data);
    //     return data;
    //   }),
    // );
    //
    // upload images to s3
    // await Promise.all(
    //   form.images.map(async (image, index) => {
    //     const res = await fetch(signedUrls[index].url, {
    //       method: 'PUT',
    //       body: image,
    //     });
    //     if (res.ok) {
    //       console.log('image uploaded');
    //       setForm((prevState) => ({
    //         ...prevState,
    //         images: prevState.images.map((img) => ({
    //           ...img,
    //           url: signedUrls[index].public_url,
    //         })),
    //       }));
    //     }
    //   }),
    // );

    const res = await fetch(`${API_URL}/listing`, {
      method: 'POST',
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({
        title: form.name,
        description: form.description,
        type: 'PRODUCT',
        price: form.rental ? null : form.price,
        rental: form.rental ? form.price : null,
        negotiable: form.negotiable,
        //   state
        status: form.status,
        category: form.category.uuid,
        tags: form.tags,
        // images: form.images.map((image) => image.key),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      setErrors(data.errors);
      return;
    }

    const data = await res.json();
    console.log(data);
    // redirect(data.uuid);
  };

  return (
    <div className='flex w-full justify-center'>
      <form
        className='flex max-w-screen-md flex-1 flex-col gap-4 py-4'
        onSubmit={handleSubmit}
      >
        <h1 className='mb-2 text-3xl font-bold'>Create a new listing</h1>
        <HorizontalDivider />
        <h4 className='text-lg font-bold'>Basic</h4>
        <Input
          id={'name'}
          name={'name'}
          type={'text'}
          placeholder='Name'
          value={form.name}
          addClass='!max-w-none !w-full'
          required={true}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />
        <CategorySelect
          value={form.category.name}
          onChange={(category: { uuid: string; name: string }) => {
            setForm((prevState) => ({
              ...prevState,
              category,
            }));
          }}
        />
        <div className='flex items-center gap-4'>
          <StatusSelect
            value={form.status}
            onChange={(status: 'PUBLIC' | 'PRIVATE') => {
              setForm((prevState) => ({
                ...prevState,
                status,
              }));
            }}
          />
        </div>
        <HorizontalDivider />
        <div className='flex flex-col gap-2'>
          <h4 className='text-lg font-bold'> Images</h4>
          <ImageInput />
        </div>
        <HorizontalDivider />
        <div className='flex w-full flex-col gap-4'>
          <h4 className='text-lg font-bold'>Details</h4>
          <Input
            id='Description'
            name='Description'
            type='text'
            placeholder='Description'
            value={form.description}
            addClass='!max-w-none !w-full'
            required={true}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />
          <div className='flex items-center gap-2'>
            <Input
              id={'price'}
              name={'price'}
              type={'number'}
              placeholder='Price'
              value={form.price}
              addClass='!max-w-none !w-full'
              required={true}
              onChange={(e) =>
                setForm({
                  ...form,
                  price: toInteger(e.target.value) || undefined,
                })
              }
            />
            <div
              className='flex items-center justify-between gap-2'
              title={'Rental'}
            >
              <IconCurrencyDollar size={32} className='text-text-secondary' />
              <label className='relative inline-flex cursor-pointer items-center'>
                <input
                  type='checkbox'
                  checked={form.rental}
                  className='peer sr-only'
                  onChange={(e) =>
                    setForm({
                      ...form,
                      rental: e.target.checked,
                    })
                  }
                />
                <div className="peer-checked:after:border-white after:bg-white peer h-10 w-16 rounded-full border border-stroke transition-colors duration-500 after:absolute after:start-[4px] after:top-1 after:h-8 after:w-8 after:rounded-full after:border after:border-stroke after:transition-all after:content-[''] peer-checked:bg-blue peer-checked:after:translate-x-6 peer-focus:ring-blue rtl:peer-checked:after:-translate-x-full"></div>
              </label>
            </div>
            <div
              className='flex items-center justify-between gap-2'
              title={'Negotiable'}
            >
              <IconDiscount2 size={32} className='text-text-secondary' />
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
                <div className="peer-checked:after:border-white after:bg-white peer h-10 w-16 rounded-full border border-stroke transition-colors duration-500 after:absolute after:start-[4px] after:top-1 after:h-8 after:w-8 after:rounded-full after:border after:border-stroke after:transition-all after:content-[''] peer-checked:bg-blue peer-checked:after:translate-x-6 peer-focus:ring-blue rtl:peer-checked:after:-translate-x-full"></div>
              </label>
            </div>
          </div>
          <div
            className={
              'relative flex w-full flex-wrap items-start justify-start gap-2 rounded-lg border border-stroke p-2 text-text-secondary'
            }
          >
            {form.tags.map((tag) => (
              <div
                key={tag}
                className={
                  'flex items-center justify-center gap-2 rounded-lg border border-stroke px-3 py-2 text-text-secondary transition-colors hover:border-stroke-secondary'
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
              placeholder={form.tags.length === 0 ? ' Tags' : ''}
              onKeyDown={(e) => {
                e.stopPropagation();
                if (e.key === 'Enter') {
                  e.preventDefault();
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
            <button
              onClick={() => {
                navigator.clipboard
                  .writeText(`${form.tags.join(',')},`)
                  .then((r) => console.log(r))
                  .catch((e) => console.log(e));
              }}
              type={'button'}
              className='absolute bottom-2 right-2 rounded px-4 py-2 font-bold transition-colors duration-200 ease-in-out hover:text-blue/75'
            >
              <IconCopy size={24} />
            </button>
          </div>
          <HorizontalDivider />
          <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
          >
            <h4 className='text-lg font-bold'>Meetup point</h4>
            <div className='flex h-64 w-full flex-col gap-2 overflow-hidden rounded-lg border border-stroke bg-primary'>
              {/* {!mapLoaded && (*/}
              {/*  <div className='absolute inset-0 z-50 flex h-full w-full items-center justify-center'>*/}
              {/*    <div className='rounded-lg border-2 border-stroke bg-primary px-4 py-2'>*/}
              {/*      Map Loading...*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/* )}*/}
              <Map
                zoom={11}
                center={{
                  lat: 42.6977,
                  lng: 23.3219,
                }}
                fullscreenControl={false}
                gestureHandling={'greedy'}
                streetViewControl={false}
                mapTypeControl={false}
                className='h-full w-full focus:outline-none focus:ring-0'
                mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID as string}
                onClick={(e) => {
                  if (!e.detail.latLng) return;
                  setSelectLocation({
                    ...e.detail.latLng,
                  });
                  console.log(e);
                }}
              >
                {selectLocation && (
                  <Marker
                    position={{
                      lat: selectLocation.lat,
                      lng: selectLocation.lng,
                    }}
                  />
                )}
              </Map>
            </div>
            {selectLocation && (
              <Address lat={selectLocation.lat} lng={selectLocation.lng} />
            )}
          </APIProvider>
          <div className='flex items-center justify-end gap-8'>
            <button
              type={'button'}
              className='rounded-lg font-medium text-text-secondary transition-colors duration-200 ease-in-out hover:text-blue'
            >
              Reset
            </button>
            <button
              type={'submit'}
              className='text-white rounded-lg border border-stroke bg-blue/80 px-4 py-2 font-bold text-primary transition-colors duration-200 ease-in-out hover:bg-blue'
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CreateProductPage;
