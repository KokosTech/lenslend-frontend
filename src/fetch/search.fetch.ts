import { API_URL } from '@/configs/api';
import { GlobalSearchResult, SearchType } from '@/types/data/search.type';
import { paginatedFetch } from '@/utils/paginated-fetch';

export const getSearch = async (
  search: string,
  category?: string,
  page = 1,
  limit = 12,
) => {
  // === GLOBAL SEARCH ===

  if (category === undefined) {
    const res = await fetch(`${API_URL}/search?search=${search}}`, {
      next: {
        revalidate: 60,
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
        revalidate: 60,
      },
      cache: 'no-store',
    },
  );
};
