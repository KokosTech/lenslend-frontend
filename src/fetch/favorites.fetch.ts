import {
  DEFAULT_LISTING_FETCH_LIMIT,
  DEFAULT_PAGE,
  DEFAULT_PLACE_FETCH_LIMIT,
} from '@/constants/limits';
import { paginatedFetch } from '@/utils/paginated-fetch';
import { ShortListingResponse } from '@/types/data/listing.type';
import { CardPlace } from '@/types/data/place.type';

export const getFavoriteListings = async (
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LISTING_FETCH_LIMIT,
  auth: string,
) => {
  try {
    return await paginatedFetch<ShortListingResponse>(
      '/user/me/saved/listing',
      page,
      limit,
      {
        next: {
          revalidate: 5,
          tags: ['saved'],
        },
        headers: {
          Authorization: auth,
        },
      },
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getFavoritePlaces = async (
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_PLACE_FETCH_LIMIT,
  auth: string,
) => {
  try {
    return await paginatedFetch<CardPlace>(
      '/user/me/saved/place',
      page,
      limit,
      {
        next: {
          revalidate: 5,
          tags: ['saved'],
        },
        headers: {
          Authorization: auth,
        },
      },
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};
