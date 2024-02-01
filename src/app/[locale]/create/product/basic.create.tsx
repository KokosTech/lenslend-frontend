import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import StatusSelect from '@/partials/create/statusSelect';
import CategorySelect from '@/partials/create/categorySelect';

import Input from '@/components/common/input';
import HorizontalDivider from '@/components/horizontalDivider';

import {
  CreateListingForm,
  ListingCategory,
  ListingStatus,
} from '@/types/forms/create-listing.form';

type BasicCreateProps = {
  name: string;
  category: ListingCategory;
  status: ListingStatus;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setForm: Dispatch<SetStateAction<CreateListingForm>>;
};

const BasicCreate = ({
  name,
  category,
  status,
  handleChange,
  setForm,
}: BasicCreateProps) => (
  <>
    <HorizontalDivider />
    <h4 className='text-lg font-bold'>Basic</h4>
    <Input
      id={'name'}
      name={'name'}
      type={'text'}
      placeholder='Name'
      value={name}
      addClass='!max-w-none !w-full'
      required={true}
      onChange={handleChange}
    />
    <CategorySelect
      value={category.name}
      onChange={(category: ListingCategory) => {
        setForm((prevState) => ({
          ...prevState,
          category,
        }));
      }}
    />
    <div className='flex items-center gap-4'>
      <StatusSelect
        value={status}
        onChange={(status: ListingStatus) => {
          setForm((prevState) => ({
            ...prevState,
            status,
          }));
        }}
      />
    </div>
  </>
);

export default BasicCreate;
