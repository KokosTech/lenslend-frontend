'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChangeEvent, FormEvent, useState } from 'react';
import {
  CreateProductErrors,
  LocationType,
} from '@/types/forms/create-listing.form';
import { ImageInputProps } from '@/types/s3.type';
import ImageSelect from '@/partials/create/image.select';
import MapCreate from '@/partials/create/map.create';
import CreateButtons from '@/partials/create/createButtons';
import BasicCreatePlace from '@/partials/create/place/basic.create-place';
import {
  CreatePlaceInitial,
  CreatePlaceInitialErrors,
} from '@/constants/forms/create-place.initial';
import {
  CreatePlaceErrors,
  CreatePlaceForm,
} from '@/types/forms/create-place-form';
import { handleCreatePlace } from '@/utils/create/place.create';
import FormErrors from '@/components/common/form/errors';
import DetailsCreatePlace from '@/partials/create/place/details.create-place';
import { IconLoader3 } from '@tabler/icons-react';

const CreatePage = () => {
  const router = useRouter();
  const t = useTranslations('create.place');

  const [form, setForm] = useState<CreatePlaceForm>(CreatePlaceInitial);
  const [images, setImages] = useState<ImageInputProps[]>([]);

  const [redirecting, setRedirecting] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<CreatePlaceErrors>(
    CreatePlaceInitialErrors,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
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
      ...CreatePlaceInitialErrors,
      ...newErrors,
    });
    setSubmitting(false);
  };

  const handleReset = () => {
    setForm(CreatePlaceInitial);
    setImages([]);
    setErrors(CreatePlaceInitialErrors);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const place = await handleCreatePlace(
        form,
        images,
        handleError,
        (key: string) => t(`errors.${key}`),
      );
      if (place) {
        setRedirecting(true);
        setForm(CreatePlaceInitial);
        setImages([]);
        router.push(`/places/${place.uuid}`);
      }
    } catch (error) {
      setRedirecting(false);
      handleError({ global: [t('errors.500')] });
    } finally {
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
      <BasicCreatePlace
        icon={form.icon}
        name={form.name}
        category={form.category}
        errors={errors}
        handleChange={handleChange}
        setForm={setForm}
      />
      <ImageSelect
        title={t('images')}
        images={images}
        setImages={setImages}
        errors={errors.images}
      />
      <DetailsCreatePlace
        description={form.description}
        tags={form.tags}
        form={form}
        errors={errors}
        setForm={setForm}
        handleChange={handleChange}
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

export default CreatePage;
