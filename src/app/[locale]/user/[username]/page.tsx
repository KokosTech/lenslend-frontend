import { unstable_setRequestLocale } from 'next-intl/server';
import { PublicProfile } from '@/types/data/user.type';
import { notFound } from 'next/navigation';
import { API_URL } from '@/configs/api';
import ListingsGrid from '@/partials/grid/listings.grid';
import Profile from '@/partials/listings/listing/profile';
import PlacesGrid from '@/partials/grid/places.grid';

const UserPage = async ({
  params: { locale, username },
}: {
  params: { locale: string; username: string };
}) => {
  unstable_setRequestLocale(locale);

  const profile = await getUser(username);

  if (!profile) notFound();

  return (
    <div className='flex h-full w-full flex-col-reverse justify-end gap-4 lg:flex-row'>
      <div className='flex w-full flex-col gap-4'>
        <ListingsGrid
          title={`@${username}'s listings`}
          url={`/user/${username}/listings`}
          username={username}
        />
        <PlacesGrid
          title={`@${username}'s places`}
          url={`/user/${username}/places`}
          username={username}
          even
        />
      </div>
      <div className='flex h-fit flex-col items-center gap-4 lg:sticky lg:-top-14 lg:pt-16'>
        <Profile {...profile} />
      </div>
    </div>
  );
};

const getUser = async (username: string) => {
  const response = await fetch(`${API_URL}/user/${username}`, {
    next: {
      revalidate: 1,
      tags: [`/user/${username}`],
    },
  });

  if (!response.ok) return null;

  return (await response.json()) as PublicProfile;
};

export function generateMetadata({
  params: { username },
}: {
  params: { locale: string; username: string };
}) {
  return {
    title: `@${username}`,
  };
}

export default UserPage;
