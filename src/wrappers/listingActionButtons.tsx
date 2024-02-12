'use client';
import { onSave } from '@/utils/saves/listing.save';
import ActionButtons from '@/components/common/buttons/actionButtons';

const ListingActionButtons = ({
  uuid,
  phone,
  addClass,
}: {
  uuid: string;
  phone: string;
  addClass?: string;
}) => (
  <ActionButtons
    uuid={uuid}
    phone={phone}
    onSave={onSave}
    addClass={addClass}
  />
);

export default ListingActionButtons;
