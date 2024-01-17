import { getAuth } from '@/actions/auth';
import { User } from '@/types/data/place.type';
import { notFound } from 'next/navigation';

const ProfilePage = async () => {
  const profile = await getProfile();

  if (!profile) notFound();

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>@{profile.username}</p>
    </div>
  );
};

const getProfile = async () => {
  const auth = await getAuth();
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/user/me`);
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
    headers: {
      Authorization: `Bearer ${auth.accessToken}`,
    },
    next: {
      tags: ['user'],
    },
  });

  if (res.status === 401 || res.status === 403) {
    return null;
  }

  return (await res.json()) as User | null;
};

export default ProfilePage;
