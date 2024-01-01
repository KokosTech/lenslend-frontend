'use client';
import { IconBookmark } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useModal } from '@/context/ModalProvider';
import InfoModal from '@/components/common/modals/info.modal';

const SaveButton = ({
  uuid,
  onSave,
}: {
  uuid: string;
  onSave: (listingUUID: string) => Promise<boolean>;
}) => {
  const { open, toggleModal, setModal } = useModal();
  const t = useTranslations('listing.modal.saved');
  const onClick = async () => {
    const successfullySaved = await onSave(uuid);

    if (!successfullySaved) {
      return;
    }

    setModal(
      t('title'),
      <InfoModal
        title={t('title')}
        description={t('message') + uuid}
        onClose={toggleModal}
      />,
    );
    toggleModal();
  };

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        toggleModal();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <>
      <button
        className='flex h-10 w-10 items-center justify-center rounded-sm bg-blue transition-opacity duration-200 ease-in-out hover:opacity-90 md:h-12 md:w-12'
        onClick={() => onClick()}
      >
        <IconBookmark className='h-6 w-6 text-background md:h-7 md:w-7' />
      </button>
    </>
  );
};

export default SaveButton;
