import { paginatedFetch } from '@/utils/paginated-fetch';
import { User } from '@/types/data/place.type';

const getUsers = async (page: number = 1, limit = 12) => {
  try {
    return await paginatedFetch<User>('/user/profile', page, limit, {
      next: {
        revalidate: 60,
      },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getUsers;
