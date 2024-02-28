'use client';
import { onSave } from '@/utils/saves/listing.save';
import ActionButtons from '@/components/common/buttons/actionButtons';

const ListingActionButtons = ({
  uuid,
  title,
  phone,
  addClass,
}: {
  uuid: string;
  title: string;
  phone: string;
  addClass?: string;
}) => (
  <ActionButtons
    uuid={uuid}
    title={title}
    phone={phone}
    onSave={onSave}
    addClass={addClass}
  />
);

export default ListingActionButtons;
