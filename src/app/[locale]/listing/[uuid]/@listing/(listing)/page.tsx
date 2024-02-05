import { notFound } from 'next/navigation';

import ContactMap from '@/components/common/cards/components/client/maps';

import Cover from '@/partials/listings/listing/cover';
import Description from '@/partials/listings/listing/description';
import Profile from '@/partials/listings/listing/profile';

import getListing from '@/fetch/listing.fetch';

import PublishComment from '@/partials/listings/listing/publishComment';
import { FullListingResponse } from '@/types/data/listing.type';
import Gallery from '@/components/project/gallery';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

const ListingPage = async ({
  params: { uuid, locale },
}: {
  params: { uuid: string; locale: string };
}) => {
  unstable_setRequestLocale(locale);

  const t = await getTranslations('listing');
  let listing: FullListingResponse | null = null;

  try {
    listing = await getListing(uuid);
  } catch (e) {
    listing = null;
    return (
      <div className='flex h-screen w-full flex-col items-center justify-center'>
        <h2 className='bg-gradient bg-clip-text p-2 text-5xl font-black text-transparent'>
          {t('errors.unauthorized')}
        </h2>
        <Link
          href={'/'}
          className='text-white mt-8 rounded-md bg-primary px-5 py-2 transition-all hover:scale-105'
        >
          {t('errors.go_back')}
        </Link>
      </div>
    );
  }

  if (!listing) notFound();

  const { title, images, user } = listing;
  const thumbnail = images && images.length > 0 ? images[0] : undefined;

  return (
    <div className='flex w-full flex-col justify-center gap-4 pb-4 pt-2 md:pt-8 lg:flex-row'>
      <div className='flex w-full max-w-screen-lg  flex-col items-center gap-4'>
        <Cover userUuid={user.uuid} image={thumbnail} {...listing} />
        {images && images.length > 1 && (
          <Gallery name={title} pictures={images} />
        )}
        <Description {...listing} />
        <PublishComment listingId={uuid} />
      </div>
      <div className='flex flex-col items-center gap-4'>
        <Profile {...user} />
        <ContactMap {...listing} />
      </div>
    </div>
  );
};

export default ListingPage;
