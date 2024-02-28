/* eslint-disable indent */

import { API_URL } from '@/configs/api';
import { CardPlace, Place } from '@/types/data/place.type';
import { getAuth } from '@/actions/auth';
import {
  HTTPForbiddenException,
  HTTPUnauthorizedException,
} from '@/errors/HTTPExceptions';
import { paginatedFetch } from '@/utils/paginated-fetch';

export const getPlace = async (uuid: string) => {
  const auth = await getAuth('ssr');

  const response = await fetch(`${API_URL}/place/${uuid}`, {
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

  return (await response.json()) as Place | null;
};

export const getPlaces = async (
  page: number = 1,
  limit: number = 4,
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
          revalidate: 60,
        },
        cache: 'no-cache',
        headers: {
          Authorization: auth || '',
        },
      },
    );
  } catch (error) {
    console.error(error);
    return null;
  }
};
