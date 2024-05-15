import { Place } from '@/types/data/place.type';
import HorizontalDivider from '@/components/horizontalDivider';
import Dates from '@/components/common/dates';
import Tag from '@/components/common/tag';
import Address from '@/components/common/address';
import TranslationWrapper from '@/wrappers/translation.wrapper';

const TextPlace = ({
  name,
  icon,
  description,
  category,
  lat,
  lng,
  tags,
  created_at,
  updated_at,
}: Place) => (
  <>
    <div className='flex flex-col gap-1'>
      <h2 className='text-2xl font-bold'>
        {icon} {name}
      </h2>
      <p className='text-text-secondary'>
        <Address lng={lng} lat={lat} />
      </p>
    </div>
    <HorizontalDivider />
    <div className='flex flex-col gap-4'>
      <div className='self-start rounded-lg border border-stroke px-3 py-1.5'>
        {category.name}
      </div>
      <p className='relative h-fit whitespace-pre-wrap break-words text-text'>
        <TranslationWrapper text={description}>
          {description}
        </TranslationWrapper>
      </p>

      <div className='flex w-full flex-wrap items-end justify-end gap-4 text-text-secondary'>
        {tags?.map(({ tag }) => <Tag tag={tag} key={tag.uuid} />)}
      </div>
      <Dates created_at={created_at} updated_at={updated_at} />
    </div>
    <HorizontalDivider />
  </>
);

export default TextPlace;
