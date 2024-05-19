'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChangeEvent, FormEvent, useState } from 'react';

import FormErrors from '@/components/common/form/errors';

import MapCreate from '@/partials/create/map.create';
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
import ImageSelect from '@/partials/create/image.select';
import CreateButtons from '@/partials/create/createButtons';
import { IconLoader3 } from '@tabler/icons-react';

const CreateProductPage = () => {
  const router = useRouter();
  const t = useTranslations('create.listing');

  const [form, setForm] = useState<CreateListingForm>(CreateListingInitial);
  const [images, setImages] = useState<ImageInputProps[]>([]);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [redirecting, setRedirecting] = useState<boolean>(false);
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
        setRedirecting(true);
        router.push(`/listing/${listing.uuid}`);
      }
    } catch (error) {
      setRedirecting(false);
      handleError({ global: [t('errors.500')] });
    } finally {
      setRedirecting(false);
      setSubmitting(false);
    }
  };

  if (redirecting) {
    return (
      <div className='flex flex-col items-center justify-center gap-4 lg:flex-row'>
        <IconLoader3 size={96} className='animate-spin-slow text-green' />
        <h3 className='text-center text-3xl font-bold text-blue'>
          {t('redirecting')}
        </h3>
      </div>
    );
  }

  return (
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
      <ImageSelect
        title={t('images')}
        images={images}
        setImages={setImages}
        errors={errors.images}
      />
      <DetailsCreate
        {...form}
        handleChange={handleChange}
        handleCheckboxChange={handleCheckboxChange}
        setForm={setForm}
        errors={errors}
      />
      <MapCreate
        title={t('location.title')}
        location={form.location}
        handleLocation={handleLocation}
        errors={errors.location}
      />
      <CreateButtons submitting={submitting} handleReset={handleReset} />
      <FormErrors errors={errors.global} />
    </form>
  );
};
export default CreateProductPage;
