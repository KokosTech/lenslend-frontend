import MessageButton from '@/components/common/buttons/messageButton';
import SaveButton from '@/components/common/buttons/saveButton';

const ActionButtons = ({
  uuid,
  title,
  phone,
  onSave,
  addClass,
}: {
  uuid: string;
  title: string;
  phone: string;
  onSave: (listingUUID: string) => Promise<boolean | null>;
  addClass?: string;
}) => (
  <div
    className={`${addClass} z-10 flex h-fit shrink-0 gap-1 overflow-hidden rounded-lg`}
  >
    <MessageButton uuid={uuid} title={title} phone={phone} />
    <SaveButton uuid={uuid} onSave={onSave} />
  </div>
);

export default ActionButtons;
