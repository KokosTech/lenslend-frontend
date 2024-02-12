import Link from 'next/link';
import { IconChevronRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

const CategoryTitle = ({ title, url }: { title: string; url?: string }) => {
  const t = useTranslations('common');

  return (
    <div className='flex items-center justify-between p-2'>
      <h1 className='text-xl font-bold sm:text-3xl'>{title}</h1>
      {url && (
        <Link
          href={url}
          className='flex items-center gap-2 text-sm font-semibold text-text-secondary transition-all hover:text-text hover:underline'
        >
          {t('view_all')}
          <IconChevronRight className='h-4 w-4' />
        </Link>
      )}
    </div>
  );
};

export default CategoryTitle;
