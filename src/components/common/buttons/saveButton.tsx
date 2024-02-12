'use client';
import InfoModal from '@/components/common/modals/info.modal';
import { useModal } from '@/context/ModalProvider';
import { IconBookmark } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

const SaveButton = ({
  uuid,
  onSave,
}: {
  uuid: string;
  onSave: (listingUUID: string) => Promise<boolean>;
}) => {
  const { open, toggleModal, setModal } = useModal();
  const t = useTranslations('listing.modal.saved');

  const onClick = () => {
    void (async () => {
      try {
        const successfullySaved = await onSave(uuid);

        if (!successfullySaved) {
          return;
        }

        setModal(
          t('title'),
          <InfoModal
            title={t('title')}
            description={t('message')}
            onClose={toggleModal}
          />,
        );
        toggleModal();
      } catch (error) {
        // Handle the error if needed
        console.error('Error while saving:', error);
      }
    })();
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
    <button
      className='flex aspect-square h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-blue transition-opacity duration-200 ease-in-out hover:opacity-90 sm:h-12 sm:w-12 lg:h-10 lg:w-10 xl:h-12 xl:w-12'
      onClick={onClick}
    >
      <IconBookmark className='h-6 w-6 text-background md:h-7 md:w-7' />
    </button>
  );
};

export default SaveButton;
