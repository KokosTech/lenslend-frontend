import { useTranslations } from 'next-intl';
import { IconExclamationCircle } from '@tabler/icons-react';

import BackButton from '@/components/common/buttons/backButton';

const PageLimitError = () => {
  const t = useTranslations('errors');

  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <IconExclamationCircle size={84} />
      <p className='text-center text-xl font-semibold'>
        {t('page_limit_invalid')}
      </p>
      <BackButton>{t('go_back')}</BackButton>
    </div>
  );
};

export default PageLimitError;
