import { notFound } from 'next/navigation';
import { getProfile } from '@/fetch/profile.fetch';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import ListingsGrid from '@/partials/grid/listings.grid';
import PlacesGrid from '@/partials/grid/places.grid';
import { getListings } from '@/fetch/listing.fetch';
import { getAuth } from '@/actions/auth';
import { getPlaces } from '@/fetch/place.fetch';
import PrivateProfile from '@/partials/privateProfile';

const ProfilePage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('user');

  const auth = await getAuth('ssr');
  if (!auth) notFound();

  const profile = await getProfile(auth);
  const listingsData = await getListings(1, 6, 'me', undefined, auth);
  const placesData = await getPlaces(1, 4, 'me', undefined, auth);

  if (!profile || !listingsData || !placesData) notFound();

  const { username } = profile;

  return (
    <div className='flex h-full w-full flex-col-reverse justify-end gap-4 lg:flex-row'>
      <div className='flex w-full flex-col gap-4'>
        <ListingsGrid
          title={t('listings', { username })}
          url={`/user/${username}/listings`}
          listingDataFetched={listingsData}
          username={username}
          noActions
        />
        <PlacesGrid
          title={t('places', { username })}
          url={`/user/${username}/places`}
          username={username}
          placesDataFetched={placesData}
          noActions
          even
        />
      </div>
      <PrivateProfile user={profile} />
    </div>
  );
};

export default ProfilePage;
