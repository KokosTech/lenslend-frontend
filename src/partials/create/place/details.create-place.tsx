import HorizontalDivider from '@/components/horizontalDivider';
import Input from '@/components/common/input';
import TagInput from '@/components/common/tag.input';
import ServiceSelect from '@/partials/create/place/services';
import { useTranslations } from 'next-intl';
import { isEmpty } from 'lodash';
import { Service } from '@/types/data/place.type';
import {
  CreatePlaceErrors,
  CreatePlaceForm,
} from '@/types/forms/create-place-form';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

type DetailsCreatePlaceProps = {
  description: string;
  tags: string[];
  form: CreatePlaceForm;
  errors: CreatePlaceErrors;
  setForm: Dispatch<SetStateAction<CreatePlaceForm>>;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const DetailsCreatePlace = ({
  description,
  tags,
  form,
  errors,
  setForm,
  handleChange,
}: DetailsCreatePlaceProps) => {
  const t = useTranslations('create.place.details');

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

  const handleSelectService = (service: Service) => {
    if (form.services?.find((s) => s.uuid === service.uuid)) {
      setForm((prevState) => ({
        ...prevState,
        services: prevState?.services?.filter((s) => s.uuid !== service.uuid),
      }));
      return;
    }

    setForm((prevState) => ({
      ...prevState,
      services: [...(prevState.services || []), service],
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
        <TagInput
          placeholder={t('tags')}
          tags={tags}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
          errors={errors.tags}
        />
        <ServiceSelect
          title={t('services')}
          selected={form.services}
          handleSelect={handleSelectService}
        />
      </div>
    </>
  );
};

export default DetailsCreatePlace;
