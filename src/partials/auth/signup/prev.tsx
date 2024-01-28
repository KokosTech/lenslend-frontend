import { IconChevronLeft } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

const PrevButton = ({
  currentStep,
  max,
  onPrev,
}: {
  currentStep: number;
  max: number;
  onPrev: () => void;
}) => {
  const t = useTranslations('auth.signup');

  if (currentStep < 1) return null;
  if (currentStep === max - 1) {
    return (
      <button
        type={'button'}
        onClick={onPrev}
        className='flex w-full items-center justify-center gap-1 rounded-lg border border-stroke py-2 text-lg font-semibold text-text transition-colors hover:border-stroke-secondary hover:text-text-important'
      >
        <IconChevronLeft size={22} />
        {t('skip')}
      </button>
    );
  }

  return (
    <button
      type={'button'}
      onClick={onPrev}
      className='flex w-full items-center justify-center gap-1 rounded-lg border border-stroke py-2 text-lg font-semibold text-text transition-colors hover:border-stroke-secondary hover:text-text-important'
    >
      <IconChevronLeft size={22} />
      {t('prev')}
    </button>
  );
};

export default PrevButton;
