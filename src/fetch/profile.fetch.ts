import { UserProfile } from '@/types/data/user.type';
import { API_URL } from '@/configs/api';
import { DEFAULT_CACHE_TIME } from '@/constants/limits';

const getProfile = async (auth: string) => {
  const res = await fetch(`${API_URL}/user/me`, {
    headers: {
      Authorization: auth,
    },
    next: {
      tags: ['user'],
      revalidate: DEFAULT_CACHE_TIME,
    },
  });

  if (res.status === 401 || res.status === 403) {
    return null;
  }

  return (await res.json()) as UserProfile | null;
};

export { getProfile };
