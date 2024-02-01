'use client';

import React, { ChangeEvent, FormEvent, useState } from 'react';
import HorizontalDivider from '@/components/horizontalDivider';
import ImageInput from '@/app/[locale]/create/product/image.input';
import { getAuth } from '@/actions/auth';
import { API_URL } from '@/configs/api';
import DetailsCreate from '@/app/[locale]/create/product/details.create';
import MapCreate from '@/app/[locale]/create/product/map.create';
import {
  CreateListingForm,
  LocationType,
} from '@/types/forms/create-listing.form';
import { CreateListingInitial } from '@/constants/forms/create-listing.initial';
import BasicCreate from '@/app/[locale]/create/product/basic.create';
import { createListingSchema } from '@/schemas/create-listing.schema';
import FormErrors from '@/components/common/form/errors';

type ImageInputProps = {
  file: File;
  order: number;
};

interface ErrorObject {
  _errors?: string[]; // Optional because not all objects may have this key.
  [key: string]: ErrorObject | string[] | undefined; // Allows for nested error objects or the _errors array.
}

type ExtractedErrors = {
  [key: string]: string[] | ExtractedErrors;
};

export type CreateProductErrors = {
  name: string[];
  description: string[];
  price: string[];
  rental: string[];
  negotiable: string[];
  state: string[];
  status: string[];
  category: {
    uuid: string[];
    name: string[];
  };
  tags: string[];
  location: {
    lat: string[];
    lng: string[];
  };
  images: string[];
  global: string[];
};

const CreateProductPage = () => {
  const [form, setForm] = useState<CreateListingForm>(CreateListingInitial);
  const [images, setImages] = useState<ImageInputProps[]>([]);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<CreateProductErrors>({
    name: [],
    description: [],
    price: [],
    rental: [],
    negotiable: [],
    state: [],
    status: [],
    category: {
      uuid: [],
      name: [],
    },
    tags: [],
    location: {
      lat: [],
      lng: [],
    },
    images: [],
    global: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleLocation = (location: LocationType) => {
    setForm((prevState) => ({
      ...prevState,
      location,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const token = await getAuth();
    if (!token) {
      setErrors({
        global: ['You must be logged in to create a listing'],
      });
      setSubmitting(false);
      return;
    }

    //  validate form using zod

    const result = createListingSchema.safeParse(form);
    if (!result.success) {
      const formatted = result.error.format() as unknown as {
        [key: string]: {
          _errors: string[];
        };
      };

      console.log('FORMATTED', formatted);

      const extractErrors = (errors: {
        [key: string]: {
          _errors: string[];
          [key: string]: {
            _errors: string[];
          };
        };
      }) =>
        Object.keys(errors).reduce((acc, key) => {
          if (key !== '_errors') {
            const subErrors = extractErrors(errors[key]);
            console.log('SUB ERRORS', subErrors);
            //  check if sub errors is an empty object
            if (Object.keys(subErrors).length === 0) {
              return {
                ...acc,
                [key]: errors[key]._errors,
              };
            }
            return {
              ...acc,
              [key]: subErrors,
            };
          }
          return acc;
        }, {});

      const newErrors: Partial<CreateProductErrors> = extractErrors(formatted);

      setErrors(newErrors);
      setSubmitting(false);
      return;
    }

    console.log(form);
    console.log(token);

    //   for each image get signed url to upload to s3
    const signedUrls = await Promise.all(
      images.map(async (image) => {
        const res = await fetch(
          `${API_URL}/file/upload?name=${image.file.name}&type=${
            image.file.type.split('/')[1]
          }&acl=${form.status === 'PUBLIC' ? 'public-read' : 'private'}`,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        const data = (await res.json()) as {
          url: string;
          key: string;
          public_url: string;
        };
        console.log(data);
        return {
          ...data,
          order: image.order,
        };
      }),
    );

    console.log(signedUrls);

    // upload images to s3
    await Promise.all(
      signedUrls.map(async (imageUrl) => {
        const imageToUpload = images.find(
          (image) => image.order === imageUrl.order,
        );
        if (!imageToUpload) {
          console.log('image not found');
          setErrors({
            images: ['Image not found'],
          });
          setSubmitting(false);
          return;
        }

        const res = await fetch(imageUrl.url, {
          method: 'PUT',
          body: imageToUpload.file,
          headers: {
            'Content-Type': imageToUpload.file.type,
          },
        });

        if (!res.ok) {
          const data = await res.json();
          console.log(data);
          setErrors(data.errors);
          return;
        }
        return res;
      }),
    );

    if (!form.location) return;

    const res = await fetch(`${API_URL}/listing`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: form.name,
        description: form.description,
        type: 'PRODUCT',
        price: form.rental ? null : form.price,
        rental: form.rental ? form.price : null,
        negotiable: form.negotiable,
        state: form.state,
        status: form.status,
        categoryId: form.category.uuid,
        tags: form.tags,
        lat: form.location.lat,
        lng: form.location.lng,
        images: signedUrls.map((url) => url.public_url),
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      console.log(data);
      setErrors({
        global: [data.message],
      });
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
        <BasicCreate
          {...form}
          handleChange={handleChange}
          setForm={setForm}
          errors={errors}
        />
        <HorizontalDivider />
        <div className='flex flex-col gap-2'>
          <h4 className='text-lg font-bold'> Images</h4>
          <ImageInput images={images} setImages={setImages} />
        </div>
        <DetailsCreate
          {...form}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
          setForm={setForm}
          errors={errors}
        />
        <MapCreate location={form.location} handleLocation={handleLocation} />
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
        <FormErrors errors={errors.global} />
      </form>
    </div>
  );
};
export default CreateProductPage;
