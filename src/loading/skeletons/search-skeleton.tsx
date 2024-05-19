import {
  IconCameraDollar,
  IconMap,
  IconSearch,
  IconUsers,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

const CategorySelect = ({
  icon,
  text,
}: {
  icon: JSX.Element;
  text: string;
}) => {
  const t = useTranslations('search.categories');

  return (
    <div className='flex aspect-square h-16 w-full animate-pulse items-center justify-center gap-2 rounded-xl border border-stroke bg-primary p-4 focus:border-stroke-secondary focus:outline-none sm:w-fit sm:shrink-0 lg:aspect-auto'>
      {icon}
      <span className='hidden font-semibold lg:block'>{t(text)}</span>
    </div>
  );
};

const SearchSkeleton = () => {
  const t = useTranslations('search');

  return (
    <div className='sticky z-20 bg-background py-4 sm:top-0'>
      <div className='flex w-full flex-col items-center gap-4 sm:h-16 sm:flex-row'>
        <div className='flex h-16 w-full items-center gap-4'>
          <input
            className='h-full w-full animate-pulse  rounded-xl border border-stroke bg-primary p-4 focus:border-stroke-secondary focus:outline-none'
            placeholder={t('placeholder')}
            name='search'
            type='text'
            autoComplete='off'
            required
            id='search'
            disabled
          />
          <div className='flex h-16 w-16 shrink-0  animate-pulse items-center justify-center rounded-xl border border-stroke bg-primary p-4 focus:border-stroke-secondary focus:outline-none'>
            <IconSearch className='h-12 w-12 font-semibold' />
          </div>
        </div>
        <div className='flex h-16 w-full shrink-0 items-center gap-4 sm:w-fit'>
          <CategorySelect icon={<IconMap />} text={'Places'} />
          <CategorySelect icon={<IconCameraDollar />} text={'Equipment'} />
          <CategorySelect icon={<IconUsers />} text={'Freelancers'} />
        </div>
      </div>
    </div>
  );
};

export default SearchSkeleton;
