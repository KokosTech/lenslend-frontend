import { paginatedFetch } from '@/utils/paginated-fetch';

import { User } from '@/types/data/place.type';

import { DEFAULT_PAGE, DEFAULT_USER_LIMIT } from '@/constants/limits';

const getUsers = async (
  page: number = DEFAULT_PAGE,
  limit = DEFAULT_USER_LIMIT,
) => {
  try {
    return await paginatedFetch<User>('/user/profile', page, limit, {
      next: {
        revalidate: 60,
        tags: ['users'],
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getUsers;
