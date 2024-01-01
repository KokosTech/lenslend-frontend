'use client';
import { onSave } from '@/utils/saves/listing.save';
import ActionButtons from '@/components/common/buttons/actionButtons';

const ListingActionButtons = ({
  uuid,
  userUuid,
  addClass,
}: {
  uuid: string;
  userUuid: string;
  addClass?: string;
}) => (
  <ActionButtons
    uuid={uuid}
    userUuid={userUuid}
    onSave={onSave}
    addClass={addClass}
  />
);

export default ListingActionButtons;
