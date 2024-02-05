import { useTranslations } from 'next-intl';
import { IconEdit, IconMessageReport } from '@tabler/icons-react';

const ButtonsPlace = ({}: { uuid: string }) => {
  const t = useTranslations('place.buttons');

  return (
    <>
      <div className='flex gap-4'>
        <button className='text-md flex w-full items-center justify-center gap-2 rounded-lg border border-stroke px-8 py-4 text-center font-semibold text-text transition-colors duration-200 ease-in-out hover:border-stroke-secondary hover:bg-stroke hover:text-text-important'>
          <IconEdit />
          {t('edit')}
        </button>
      </div>
      <div className='flex gap-4'>
        <button className='text-md flex w-full items-center justify-center gap-2 rounded-lg border border-stroke px-8 py-4 text-center font-semibold text-text transition-colors duration-200 ease-in-out hover:border-stroke-secondary hover:bg-stroke hover:text-text-important'>
          <IconMessageReport />
          {t('report')}
        </button>
      </div>
    </>
  );
};

export default ButtonsPlace;
