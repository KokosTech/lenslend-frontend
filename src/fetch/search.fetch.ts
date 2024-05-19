import { API_URL } from '@/configs/api';
import { paginatedFetch } from '@/utils/paginated-fetch';

import { GlobalSearchResult, SearchType } from '@/types/data/search.type';

import {
  DEFAULT_CACHE_TIME,
  DEFAULT_LISTING_LIMIT,
  DEFAULT_PAGE,
} from '@/constants/limits';

export const getSearch = async (
  search: string,
  category?: string,
  page = DEFAULT_PAGE,
  limit = DEFAULT_LISTING_LIMIT,
) => {
  // === GLOBAL SEARCH ===

  if (category === undefined) {
    const res = await fetch(`${API_URL}/search?search=${search}}`, {
      next: {
        revalidate: DEFAULT_CACHE_TIME,
      },
    });

    return (await res.json()) as GlobalSearchResult;
  }

  // === CATEGORY SEARCH ===

  return paginatedFetch<SearchType>(
    `/search?search=${search}&category=${category}`,
    page,
    limit,
    {
      next: {
        revalidate: DEFAULT_CACHE_TIME,
      },
      cache: 'no-store',
    },
  );
};
