import MessageButton from '@/components/common/buttons/messageButton';
import SaveButton from '@/components/common/buttons/saveButton';

const ActionButtons = ({
  uuid,
  userUuid,
  onSave,
  addClass,
}: {
  uuid: string;
  userUuid: string;
  onSave: (listingUUID: string) => Promise<boolean>;
  addClass?: string;
}) => (
  <div
    className={`${addClass} z-10 flex h-fit shrink-0 gap-1 overflow-hidden rounded-lg`}
  >
    <MessageButton uuid={userUuid} />
    <SaveButton uuid={uuid} onSave={onSave} />
  </div>
);

export default ActionButtons;
