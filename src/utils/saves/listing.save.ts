import { save } from '@/actions/save';

export const onSave = async (listingUUID: string) => {
  try {
    const res = await save(listingUUID, 'listing');
    if (typeof res === 'boolean') {
      return res;
    }

    return null;
  } catch (error) {
    return null;
  }
};
