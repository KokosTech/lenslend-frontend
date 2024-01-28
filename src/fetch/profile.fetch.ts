import { getAuth } from '@/actions/auth';
import { User } from '@/types/data/place.type';

const getProfile = async () => {
  const auth = await getAuth();

  if (!auth) {
    return null;
  }

  console.log(`${process.env.NEXT_PUBLIC_API_URL}/user/me`);
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

  console.log('fetching profile');

  return (await res.json()) as User | null;
};

export { getProfile };
