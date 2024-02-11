/* eslint-disable indent */

import { API_URL } from '@/configs/api';
import {
  FullListingResponse,
  ShortListingResponse,
} from '@/types/data/listing.type';
import { getAuth } from '@/actions/auth';
import {
  HTTPForbiddenException,
  HTTPUnauthorizedException,
} from '@/errors/HTTPExceptions';
import { paginatedFetch } from '@/utils/paginated-fetch';

export const getListings = async (
  page: number = 1,
  limit: number = 6,
  username?: string,
  category?: string,
) => {
  try {
    return await paginatedFetch<ShortListingResponse>(
      `/${username ? `user/${username}/` : ''}listing${
        category ? `?category=${category}` : ''
      }`,
      page,
      limit,
      {
        next: {
          revalidate: 60,
        },
      },
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getListing = async (uuid: string) => {
  const auth = await getAuth();

  const response = await fetch(`${API_URL}/listing/${uuid}`, {
    cache: 'no-cache',
    headers: auth
      ? {
          Authorization: auth,
        }
      : {},
  });

  if (!response.ok) {
    switch (response.status) {
      case 401:
        throw new HTTPUnauthorizedException();
      case 403:
        throw new HTTPForbiddenException();
      case 404:
        return null;
    }

    throw new Error(`Couldn't fetch listing ${response.status}`);
  }

  return (await response.json()) as FullListingResponse;
};

export default getListing;
