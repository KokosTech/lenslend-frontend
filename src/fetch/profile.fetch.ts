import { getAuth } from '@/actions/auth';
import { UserProfile } from '@/types/data/user.type';

const getProfile = async () => {
  const auth = await getAuth();

  if (!auth) {
    return null;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
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

  const user = (await res.json()) as UserProfile | null;

  return user;
};

export { getProfile };
