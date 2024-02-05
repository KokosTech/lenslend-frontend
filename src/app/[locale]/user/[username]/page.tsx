import { unstable_setRequestLocale } from 'next-intl/server';
import { PublicProfile } from '@/types/data/user.type';
import { notFound } from 'next/navigation';
import { API_URL } from '@/configs/api';
import ListingsGrid from '@/partials/grid/listings.grid';
import Profile from '@/partials/listings/listing/profile';

const UserPage = async ({
  params: { locale, username },
}: {
  params: { locale: string; username: string };
}) => {
  unstable_setRequestLocale(locale);

  const profile = await getUser(username);

  if (!profile) notFound();

  return (
    <div className='flex'>
      <ListingsGrid username={username} />
      <Profile {...profile} />
    </div>
  );
};

const getUser = async (username: string) => {
  const response = await fetch(`${API_URL}/user/${username}`, {
    next: {
      revalidate: 1,
    },
  });

  if (!response.ok) return null;

  return (await response.json()) as PublicProfile;
};

export default UserPage;
