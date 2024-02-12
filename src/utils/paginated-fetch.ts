/* eslint-disable indent */

import { PaginatedResponse } from '@/types/paginated-response.type';
import { API_URL } from '@/configs/api';
import {
  HTTPForbiddenException,
  HTTPUnauthorizedException,
} from '@/errors/HTTPExceptions';

export const paginatedFetch = async <T>(
  url: string,
  page: number,
  limit: number,
  options?: {
    headers?: HeadersInit;
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
  },
): Promise<PaginatedResponse<T>> => {
  const response = await fetch(
    `${API_URL}${url}${url.includes('?') ? '&' : '?'}page=${page}&limit=${limit}`,
    {
      ...options,
    },
  );

  console.warn('url', `${API_URL}${url}?page=${page}&limit=${limit}`);

  if (!response.ok) {
    switch (response.status) {
      case 401:
        throw new HTTPUnauthorizedException();
      case 403:
        throw new HTTPForbiddenException();
      case 404:
        return {
          data: [],
          totalCount: 0,
        } as unknown as PaginatedResponse<T>;
    }

    throw new Error('Failed to fetch data', {
      cause: response.status,
    });
  }

  return (await response.json()) as PaginatedResponse<T>;
};
