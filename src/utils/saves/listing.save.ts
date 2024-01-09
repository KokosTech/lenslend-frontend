import { axiosInstance } from '@/configs/axios';

export const onSave = async (listingUUID: string) => {
  return true;

  try {
    const response = await axiosInstance.post(`/listings/${listingUUID}/save`, {
      listingUUID,
    });

    return response.status === 201;
  } catch (error) {
    return false;
  }
};
