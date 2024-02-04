import { isEmpty, toInteger } from 'lodash';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { IconCurrencyDollar, IconDiscount2 } from '@tabler/icons-react';

import Input from '@/components/common/input';
import TagInput from '@/components/common/tag.input';
import ToggleInput from '@/components/common/toggle.input';
import HorizontalDivider from '@/components/horizontalDivider';

import {
  CreateListingForm,
  CreateProductErrors,
} from '@/types/forms/create-listing.form';
import { useTranslations } from 'next-intl';

type DetailsCreateProps = {
  description: string;
  price?: number;
  rental: boolean;
  negotiable: boolean;
  tags: string[];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setForm: Dispatch<SetStateAction<CreateListingForm>>;
  errors: CreateProductErrors;
};

const DetailsCreate = ({
  description,
  price,
  rental,
  negotiable,
  tags,
  handleChange,
  handleCheckboxChange,
  setForm,
  errors,
}: DetailsCreateProps) => {
  const t = useTranslations('create.listing.details');

  const handleAddTag = (tag: string) => {
    if (tags.includes(tag) || isEmpty(tag)) return;
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

  return (
    <>
      <HorizontalDivider />
      <div className='flex w-full flex-col gap-4'>
        <h4 className='text-lg font-bold'>{t('title')}</h4>
        <Input
          id='Description'
          name='description'
          type='text'
          placeholder={t('description')}
          value={description}
          addClass='!max-w-none !w-full'
          required={true}
          onChange={handleChange}
          errors={errors.description}
        />
        <div className='flex items-center gap-2'>
          <Input
            id={'price'}
            name={'price'}
            type={'number'}
            placeholder={t('price')}
            value={price}
            addClass='!max-w-none !w-full'
            required={true}
            onChange={(e) =>
              setForm((prevState) => ({
                ...prevState,
                price: toInteger(e.target.value) || undefined,
              }))
            }
            errors={errors.price}
          />
          <ToggleInput
            label={
              <IconCurrencyDollar size={32} className='text-text-secondary' />
            }
            title={t('rental')}
            name={'rental'}
            value={rental}
            onChange={handleCheckboxChange}
          />
          <ToggleInput
            label={<IconDiscount2 size={32} className='text-text-secondary' />}
            title={t('negotiable')}
            name={'negotiable'}
            value={negotiable}
            onChange={handleCheckboxChange}
          />
        </div>
        <TagInput
          placeholder={t('tags')}
          tags={tags}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
          errors={errors.tags}
        />
      </div>
    </>
  );
};

export default DetailsCreate;
