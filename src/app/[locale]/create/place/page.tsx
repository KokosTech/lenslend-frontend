'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ChangeEvent, FormEvent, useState } from 'react';
import {
  CreateListingForm,
  CreateProductErrors,
  ListingCategory,
  LocationType,
} from '@/types/forms/create-listing.form';
import {
  CreateListingInitial,
  CreateListingInitialErrors,
} from '@/constants/forms/create-listing.initial';
import { ImageInputProps } from '@/types/s3.type';
import { handleCreateListing } from '@/utils/create/listing';
import ImageSelect from '@/partials/create/image.select';
import MapCreate from '@/partials/create/map.create';
import CreateButtons from '@/partials/create/createButtons';
import TagInput from '@/components/common/tag.input';
import { isEmpty } from 'lodash';
import HorizontalDivider from '@/components/horizontalDivider';
import Input from '@/components/common/input';
import CategorySelect from '@/partials/create/categorySelect';
import ServiceSelect from '@/partials/create/place/services';
import SelectIcon from '@/partials/create/place/selectIcon';

const CreatePage = () => {
  const router = useRouter();
  const t = useTranslations('create.place');

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

  const handleAddTag = (tag: string) => {
    if (form.tags.includes(tag) || isEmpty(tag)) return;
    setForm((prevState) => ({
      ...prevState,
      tags: [...prevState.tags, tag],
    }));
  };

  const handleRemoveTag = (tag: string) => {
    setForm((prevState) => ({
      ...prevState,
      tags: prevState.tags.filter((t) => t !== tag),
    }));
  };

  const handleCategoryChange = (category: ListingCategory) => {
    setForm((prevState) => ({
      ...prevState,
      category,
    }));
  };

  return (
    <form
      className='flex max-w-screen-md flex-1 flex-col gap-4 py-4'
      onSubmit={handleSubmit}
    >
      <h1 className='mb-2 text-3xl font-bold'>{t('title')}</h1>
      <HorizontalDivider />
      <h4 className='text-lg font-bold'>{t('title')}</h4>
      <div className='flex gap-4'>
        <SelectIcon />
        <Input
          id={'name'}
          name={'name'}
          type={'text'}
          placeholder={t('name')}
          value={form.name}
          addClass='!max-w-none !w-full'
          required={true}
          onChange={handleChange}
          errors={errors.name}
        />
      </div>
      <CategorySelect
        value={form.category.name}
        placeholder={t('category')}
        errors={errors.category.name}
        onChange={handleCategoryChange}
      />
      <ImageSelect
        title={t('images')}
        images={images}
        setImages={setImages}
        errors={errors.images}
      />
      <HorizontalDivider />
      <div className='flex w-full flex-col gap-4'>
        <h4 className='text-lg font-bold'>{t('details.title')}</h4>
        <Input
          id='Description'
          name='description'
          type='text'
          placeholder={t('details.description')}
          value={form.description}
          addClass='!max-w-none !w-full'
          required={true}
          onChange={handleChange}
          errors={errors.description}
        />
        <TagInput
          placeholder={t('tags')}
          tags={form.tags}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
          errors={errors.tags}
        />
        <ServiceSelect />
      </div>
      <MapCreate
        title={t('location')}
        location={form.location}
        handleLocation={handleLocation}
        errors={errors.location}
      />
      <CreateButtons submitting={submitting} handleReset={handleReset} />
    </form>
  );
};

export default CreatePage;
