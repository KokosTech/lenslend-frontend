'use client';

import { onSave } from '@/utils/saves/place.save';
import SaveButton from '@/components/common/buttons/saveButton';

const PlaceActionButtons = ({ uuid }: { uuid: string; addClass?: string }) => (
  <div className='z-10 flex h-fit shrink-0 items-center justify-center overflow-hidden rounded-lg'>
    <SaveButton uuid={uuid} onSave={onSave} />
  </div>
);

export default PlaceActionButtons;
