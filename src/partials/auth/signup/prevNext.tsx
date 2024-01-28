import { IconChevronRight } from '@tabler/icons-react';
import SubmitButton from '@/components/common/buttons/submitButton';
import { useTranslations } from 'next-intl';

/*
            onClick={async () => {

            }}
 */

const NextButton = ({
  currentStep,
  max,
  submitting,
  onNext,
}: {
  currentStep: number;
  max: number;
  submitting: boolean;
  onNext: () => void;
}) => {
  const t = useTranslations('auth.signup');

  if (currentStep === 2) {
    return (
      <SubmitButton pendingContent={t('pending')}>{t('submit')}</SubmitButton>
    );
  } else if (currentStep === max - 1) {
    return (
      <button
        type={'button'}
        onClick={onNext}
        disabled={submitting}
        aria-disabled={submitting}
        className={`
            ${submitting ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}
            flex w-full items-center justify-center gap-1 rounded-lg border border-stroke py-2 text-lg font-semibold text-text transition-colors hover:border-stroke-secondary hover:text-text-important`}
      >
        {t('finish')}
        <IconChevronRight size={22} />
      </button>
    );
  } else {
    return (
      <button
        type={'button'}
        onClick={onNext}
        disabled={submitting}
        aria-disabled={submitting}
        className={`
            ${submitting ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}
            flex w-full items-center justify-center gap-1 rounded-lg border border-stroke py-2 text-lg font-semibold text-text transition-colors hover:border-stroke-secondary hover:text-text-important`}
      >
        {t('next')}
        <IconChevronRight size={22} />
      </button>
    );
  }
};

export default NextButton;
