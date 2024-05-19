'use client';

import Modal from '@/components/common/modals/index';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const InfoModal = ({
  title,
  description,
  onClose,
}: {
  title: string;
  description: string;
  onClose: () => void;
}) => {
  const t = useTranslations('listing.modal.saved');

  return (
    <Modal title={title} onClose={onClose} addClass='min-w-96'>
      <p className='text-lg'>{description}</p>
      <div className='mt-4 flex items-center justify-stretch gap-2 font-semibold'>
        <Link
          className='flex-1 rounded-lg border border-blue bg-blue p-2 text-center text-background'
          href='/favorites'
          onClick={() => onClose()}
        >
          {t('view_all')}
        </Link>
        <button
          className='flex-1 rounded-lg border border-stroke bg-primary p-2'
          onClick={() => onClose()}
        >
          {t('close')}
        </button>
      </div>
    </Modal>
  );
};

export default InfoModal;
