import { useTranslations } from 'next-intl';

import Dates from '@/components/common/dates';
import Tag from '@/components/common/tag';

const Description = ({
  category,
  state,
  negotiable,
  description,
  tags,
  created_at,
  updated_at,
}: {
  category: {
    name: string;
  };
  state?: string;
  negotiable: boolean;
  description: string;
  tags?: {
    tag: {
      uuid: string;
      name: string;
    };
  }[];
  created_at: string;
  updated_at: string;
}) => {
  const t = useTranslations('listing');
  return (
    <div className='w-full'>
      <div className=' rounded-xl border-2 border-stroke bg-primary text-justify'>
        <div className='relative space-y-4 px-8 py-4'>
          <div className='flex w-full flex-wrap  gap-4'>
            <div className='rounded-lg border border-stroke px-3 py-1.5'>
              {category.name}
            </div>
            <div className='rounded-lg border border-stroke px-3 py-1.5'>
              {t(`state.${state}`)}
            </div>
            {negotiable && (
              <div className='rounded-lg border border-stroke px-3 py-1.5'>
                {t('negotiable')}
              </div>
            )}
          </div>
          <p className='text-md whitespace-pre-wrap'>{description}</p>
          <div className='flex w-full flex-wrap items-end justify-end gap-4 text-text-secondary'>
            {tags?.map(({ tag }) => <Tag tag={tag} key={tag.uuid} />)}
          </div>
          <Dates created_at={created_at} updated_at={updated_at} />
        </div>
      </div>
    </div>
  );
};

export default Description;
