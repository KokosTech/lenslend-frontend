import HorizontalDivider from '@/components/horizontalDivider';
import ImageInput from '@/partials/create/image.input';
import FormErrors from '@/components/common/form/errors';
import { ImageInputProps } from '@/types/s3.type';
import { Dispatch, SetStateAction } from 'react';

type ImageSelectProps = {
  title: string;
  images: ImageInputProps[];
  setImages: Dispatch<SetStateAction<ImageInputProps[]>>;
  errors: string[];
};

const ImageSelect = ({
  title,
  images,
  setImages,
  errors,
}: ImageSelectProps) => (
  <>
    <HorizontalDivider />
    <div className='flex flex-col gap-2'>
      <h4 className='text-lg font-bold'>{title}</h4>
      <ImageInput images={images} setImages={setImages} errors={errors} />
      {errors?.length > 0 && <FormErrors errors={errors} />}
    </div>
  </>
);

export default ImageSelect;
