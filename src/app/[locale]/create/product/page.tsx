'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChangeEvent, FormEvent, useState } from 'react';

import FormErrors from '@/components/common/form/errors';
import HorizontalDivider from '@/components/horizontalDivider';
import SubmitButton from '@/components/common/buttons/submitButton';

import MapCreate from '@/partials/create/map.create';
import ImageInput from '@/partials/create/image.input';
import BasicCreate from '@/partials/create/basic.create';
import DetailsCreate from '@/partials/create/details.create';

import { handleCreateListing } from '@/utils/create/listing';

import {
  CreateListingForm,
  CreateProductErrors,
  LocationType,
} from '@/types/forms/create-listing.form';
import { ImageInputProps } from '@/types/s3.type';

import {
  CreateListingInitial,
  CreateListingInitialErrors,
} from '@/constants/forms/create-listing.initial';

const CreateProductPage = () => {
  const router = useRouter();
  const t = useTranslations('create.listing');

  const [form, setForm] = useState<CreateListingForm>(CreateListingInitial);
  const [images, setImages] = useState<ImageInputProps[]>([]);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<CreateProductErrors>(
    CreateListingInitialErrors,
  );

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

  const handleError = (newErrors: Partial<CreateProductErrors>) => {
    setErrors({
      ...CreateListingInitialErrors,
      ...newErrors,
    });
    setSubmitting(false);
  };

  const handleReset = () => {
    setForm(CreateListingInitial);
    setImages([]);
    setErrors(CreateListingInitialErrors);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const listing = await handleCreateListing(
        form,
        images,
        handleError,
        (key: string) => t(`errors.${key}`),
      );
      if (listing) {
        setForm(CreateListingInitial);
        setImages([]);
        router.push(`/listing/${listing.uuid}`);
      }
    } catch (error) {
      console.error(error);
      handleError({ global: [t('errors.500')] });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='flex w-full justify-center'>
      <form
        className='flex max-w-screen-md flex-1 flex-col gap-4 py-4'
        onSubmit={handleSubmit}
      >
        <h1 className='mb-2 text-3xl font-bold'>{t('title')}</h1>
        <BasicCreate
          {...form}
          handleChange={handleChange}
          setForm={setForm}
          errors={errors}
        />
        <HorizontalDivider />
        <div className='flex flex-col gap-2'>
          <h4 className='text-lg font-bold'>{t('images')}</h4>
          <ImageInput
            images={images}
            setImages={setImages}
            errors={errors.images}
          />
          {errors.images?.length > 0 && <FormErrors errors={errors.images} />}
        </div>
        <DetailsCreate
          {...form}
          handleChange={handleChange}
          handleCheckboxChange={handleCheckboxChange}
          setForm={setForm}
          errors={errors}
        />
        <MapCreate
          location={form.location}
          handleLocation={handleLocation}
          errors={errors.location}
        />
        <div className='flex items-center justify-end gap-8'>
          <button
            type={'button'}
            onClick={handleReset}
            className='rounded-lg font-medium text-text-secondary transition-colors duration-200 ease-in-out hover:text-blue'
          >
            {t('reset')}
          </button>
          <SubmitButton
            pendingContent={t('pending')}
            pendingOverride={submitting}
          >
            {t('submit')}
          </SubmitButton>
        </div>
        <FormErrors errors={errors.global} />
      </form>
    </div>
  );
};
export default CreateProductPage;
