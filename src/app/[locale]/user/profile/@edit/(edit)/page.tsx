import { getProfile } from '@/fetch/profile.fetch';
import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getAuth } from '@/actions/auth';

const EditProfilePage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);

  const auth = await getAuth('ssr');
  if (!auth) notFound();

  const profile = await getProfile(auth);

  if (!profile) notFound();

  return (
    <div>
      <h1>Edit Profile</h1>

      <h1>{profile.name}</h1>
      <p>@{profile.username}</p>
    </div>
  );
};

export default EditProfilePage;
