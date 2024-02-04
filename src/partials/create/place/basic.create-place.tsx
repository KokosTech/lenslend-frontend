import HorizontalDivider from '@/components/horizontalDivider';
import SelectIcon from '@/partials/create/place/selectIcon';
import Input from '@/components/common/input';
import CategorySelect from '@/partials/create/categorySelect';
import { useTranslations } from 'next-intl';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { Category } from '@/types/forms/common.form';
import {
  CreatePlaceErrors,
  CreatePlaceForm,
} from '@/types/forms/create-place-form';

type BasicCreatePlaceProps = {
  icon: string;
  name: string;
  category: Category;
  errors: CreatePlaceErrors;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setForm: Dispatch<SetStateAction<CreatePlaceForm>>;
};

const BasicCreatePlace = ({
  icon,
  name,
  category,
  errors,
  handleChange,
  setForm,
}: BasicCreatePlaceProps) => {
  const t = useTranslations('create.place.basic');

  const handleCategoryChange = (newCategory: Category) => {
    setForm((prevState) => ({
      ...prevState,
      category: newCategory,
    }));
  };

  const handleIconChange = (newIcon: string) => {
    setForm((prevState) => ({
      ...prevState,
      icon: newIcon,
    }));
  };

  return (
    <>
      <HorizontalDivider />
      <h4 className='text-lg font-bold'>{t('title')}</h4>
      <div className='flex gap-4'>
        <SelectIcon
          icon={icon}
          setIcon={handleIconChange}
          errors={errors.icon}
        />
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
      </div>
      <CategorySelect
        type='PLACE'
        value={category.name}
        placeholder={t('category')}
        errors={errors.category.name}
        onChange={handleCategoryChange}
      />
    </>
  );
};

export default BasicCreatePlace;
