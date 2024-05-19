/* eslint-disable indent */

import { getAuth } from '@/actions/auth';
import { paginatedFetch } from '@/utils/paginated-fetch';

import { API_URL } from '@/configs/api';
import {
  FullListingResponse,
  ShortListingResponse,
} from '@/types/data/listing.type';
import {
  HTTPForbiddenException,
  HTTPUnauthorizedException,
} from '@/errors/HTTPExceptions';

import {
  DEFAULT_CACHE_TIME,
  DEFAULT_LISTING_FETCH_LIMIT,
  DEFAULT_PAGE,
} from '@/constants/limits';

const getListing = async (uuid: string) => {
  const auth = await getAuth('ssr');

  const response = await fetch(`${API_URL}/listing/${uuid}`, {
    next: {
      revalidate: DEFAULT_CACHE_TIME,
    },
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

export const getListings = async (
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LISTING_FETCH_LIMIT,
  username?: string,
  category?: string,
  auth?: string,
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
          revalidate: DEFAULT_CACHE_TIME,
        },
        headers: {
          Authorization: auth ?? '',
        },
      },
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getListing;
