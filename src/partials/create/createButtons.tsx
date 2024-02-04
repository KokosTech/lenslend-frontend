import SubmitButton from '@/components/common/buttons/submitButton';
import { useTranslations } from 'next-intl';

type CreateButtonsProps = {
  submitting: boolean;
  handleReset: () => void;
};

const CreateButtons = ({ submitting, handleReset }: CreateButtonsProps) => {
  const t = useTranslations('create.listing');

  return (
    <div className='flex items-center justify-end gap-8'>
      <button
        type={'button'}
        onClick={handleReset}
        className='rounded-lg font-medium text-text-secondary transition-colors duration-200 ease-in-out hover:text-blue'
      >
        {t('reset')}
      </button>
      <SubmitButton pendingContent={t('pending')} pendingOverride={submitting}>
        {t('submit')}
      </SubmitButton>
    </div>
  );
};

export default CreateButtons;
