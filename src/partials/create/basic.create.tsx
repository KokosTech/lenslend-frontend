import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import CategorySelect from '@/partials/create/categorySelect';

import Input from '@/components/common/input';
import HorizontalDivider from '@/components/horizontalDivider';
import DropdownInput from '@/components/common/dropdown.input';

import {
  CreateListingForm,
  CreateProductErrors,
  ListingCategory,
  ListingState,
  ListingStateOptions,
  ListingStatus,
  ListingStatusOptions,
} from '@/types/forms/create-listing.form';
import { useTranslations } from 'next-intl';

type BasicCreateProps = {
  name: string;
  category: ListingCategory;
  status: ListingStatus;
  state: ListingState;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setForm: Dispatch<SetStateAction<CreateListingForm>>;
  errors: CreateProductErrors;
};

const BasicCreate = ({
  name,
  category,
  status,
  state,
  handleChange,
  setForm,
  errors,
}: BasicCreateProps) => {
  const t = useTranslations('create.listing.basic');

  const handleCategoryChange = (category: ListingCategory) => {
    setForm((prevState) => ({
      ...prevState,
      category,
    }));
  };

  return (
    <>
      <HorizontalDivider />
      <h4 className='text-lg font-bold'>{t('title')}</h4>
      <Input
        id={'name'}
        name={'name'}
        type={'text'}
        placeholder={t('name')}
        value={name}
        addClass='!max-w-none !w-full'
        required={true}
        onChange={handleChange}
        errors={errors.name}
      />
      <CategorySelect
        value={category.name}
        placeholder={t('category')}
        errors={errors.category.name}
        onChange={handleCategoryChange}
      />
      <div className='flex items-center gap-4'>
        <DropdownInput
          value={status}
          onChange={handleChange}
          dropdownOptions={ListingStatusOptions}
          id={'status'}
          name={'status'}
          type={'text'}
          placeholder={t('status.title')}
          errors={errors.status}
          t={(key) => t(`status.${key}`)}
        />
        <DropdownInput
          value={state}
          onChange={handleChange}
          dropdownOptions={ListingStateOptions}
          id={'state'}
          name={'state'}
          type={'text'}
          placeholder={t('state.title')}
          errors={errors.state}
          t={(key) => t(`state.${key}`)}
        />
      </div>
    </>
  );
};

export default BasicCreate;
