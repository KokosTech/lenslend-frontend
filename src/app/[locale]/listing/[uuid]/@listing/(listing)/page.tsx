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
import ModifyListing from '@/partials/listings/listing/modify.listing';
import { Metadata, ResolvingMetadata } from 'next';

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
      <div className='flex w-full max-w-screen-lg shrink flex-col items-center gap-4'>
        <Cover
          userUuid={user.uuid}
          userPhone={user.phone}
          image={thumbnail}
          {...listing}
        />
        {images && images.length > 1 && (
          <Gallery name={title} pictures={images} />
        )}
        <Description {...listing} />
        <PublishComment listingId={uuid} />
      </div>
      <div className='flex h-fit flex-col items-center gap-4 lg:sticky lg:top-5'>
        <Profile {...user} />
        <ContactMap {...listing} />
        <ModifyListing uuid={uuid} userUuid={user.uuid} />
      </div>
    </div>
  );
};

export async function generateMetadata({
  params: { uuid, locale },
  parent,
}: {
  params: { uuid: string; locale: string };
  parent: ResolvingMetadata;
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'listing',
  });

  const listing = await getListing(uuid);

  if (!listing) {
    return {
      title: `${t('errors.not_found')}`,
      description: t('errors.not_found'),
      twitter: {
        card: 'summary',
        site: '@lenslend',
        title: `${t('errors.not_found')} | LensLend`,
        description: t('errors.not_found'),
      },
    };
  }

  const images =
    listing.images && listing.images.length > 0 ? listing.images : undefined;

  return {
    title: listing.title,
    description: listing.description,
    twitter: {
      card: 'summary_large_image',
      site: '@lenslend',
      title: listing.title,
      description: listing.description,
      images: images?.map((image) => ({
        url: image.url,
        alt: image.alt,
      })),
    },
    openGraph: {
      title: `${listing.title} | LensLend`,
      description: listing.description,
      siteName: 'LensLend',
      images: images?.map((image) => ({
        url: image.url,
      })),
      type: 'website',
      locale: locale === 'bg' ? 'bg_BG' : 'en_US',
      alternateLocale: locale === 'bg' ? 'en_US' : 'bg_BG',
    },
  };
}

export default ListingPage;
