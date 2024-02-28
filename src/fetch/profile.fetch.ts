import { UserProfile } from '@/types/data/user.type';
import { API_URL } from '@/configs/api';

const getProfile = async (auth: string) => {
  const res = await fetch(`${API_URL}/user/me`, {
    headers: {
      Authorization: auth,
    },
    next: {
      tags: ['user'],
    },
  });

  if (res.status === 401 || res.status === 403) {
    return null;
  }

  return (await res.json()) as UserProfile | null;
};

export { getProfile };
