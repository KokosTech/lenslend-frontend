import { notFound } from 'next/navigation';
import { getProfile } from '@/fetch/profile.fetch';
import { unstable_setRequestLocale } from 'next-intl/server';

const ProfilePage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);

  const profile = await getProfile();

  if (!profile) notFound();

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>@{profile.username}</p>
    </div>
  );
};

export default ProfilePage;
