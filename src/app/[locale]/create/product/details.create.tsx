import { isEmpty, toInteger } from 'lodash';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { IconCurrencyDollar, IconDiscount2 } from '@tabler/icons-react';

import Input from '@/components/common/input';
import TagInput from '@/components/common/tag.input';
import ToggleInput from '@/components/common/toggle.input';
import HorizontalDivider from '@/components/horizontalDivider';

import { CreateListingForm } from '@/types/forms/create-listing.form';

type DetailsCreateProps = {
  description: string;
  price?: number;
  rental: boolean;
  negotiable: boolean;
  tags: string[];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setForm: Dispatch<SetStateAction<CreateListingForm>>;
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
}: DetailsCreateProps) => {
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
        <h4 className='text-lg font-bold'>Details</h4>
        <Input
          id='Description'
          name='description'
          type='text'
          placeholder='Description'
          value={description}
          addClass='!max-w-none !w-full'
          required={true}
          onChange={handleChange}
        />
        <div className='flex items-center gap-2'>
          <Input
            id={'price'}
            name={'price'}
            type={'number'}
            placeholder='Price'
            value={price}
            addClass='!max-w-none !w-full'
            required={true}
            onChange={(e) =>
              setForm((prevState) => ({
                ...prevState,
                price: toInteger(e.target.value) || undefined,
              }))
            }
          />
          <ToggleInput
            label={
              <IconCurrencyDollar size={32} className='text-text-secondary' />
            }
            title={'Rental'}
            name={'rental'}
            value={rental}
            onChange={handleCheckboxChange}
          />
          <ToggleInput
            label={<IconDiscount2 size={32} className='text-text-secondary' />}
            title={'Negotiable'}
            name={'negotiable'}
            value={negotiable}
            onChange={handleCheckboxChange}
          />
        </div>
        <TagInput
          tags={tags}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
        />
      </div>
    </>
  );
};

export default DetailsCreate;
