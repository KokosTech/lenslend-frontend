import { API_URL } from '@/configs/api';
import { FullListingResponse } from '@/types/data/listing.type';

const getListing = async (uuid: string) => {
  const response = await fetch(`${API_URL}/listing/${uuid}`, {
    cache: 'no-cache',
  });

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    throw new Error(`Couldn't fetch listing ${response.status}`);
  }

  return (await response.json()) as FullListingResponse;
};

export default getListing;
