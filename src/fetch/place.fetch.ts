/* eslint-disable indent */

import { getAuth } from '@/actions/auth';
import { API_URL } from '@/configs/api';

import { CardPlace, Place } from '@/types/data/place.type';

import {
  HTTPForbiddenException,
  HTTPUnauthorizedException,
} from '@/errors/HTTPExceptions';
import { paginatedFetch } from '@/utils/paginated-fetch';

import {
  DEFAULT_CACHE_TIME,
  DEFAULT_PAGE,
  DEFAULT_PLACE_FETCH_LIMIT,
} from '@/constants/limits';

export const getPlace = async (uuid: string) => {
  const auth = await getAuth('ssr');

  const response = await fetch(`${API_URL}/place/${uuid}`, {
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

  return (await response.json()) as Place | null;
};

export const getPlaces = async (
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_PLACE_FETCH_LIMIT,
  username?: string,
  category?: string,
  auth?: string,
) => {
  try {
    return await paginatedFetch<CardPlace>(
      `${username ? `/user/${username}` : ''}/place?format=card${category ? `&category=${category}` : ''}`,
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
