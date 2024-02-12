import type { Place } from '@/types/data/place.type';
import CloseButton from '@/components/common/buttons/closeButton';
import ImagesPlace from '@/partials/places/place/images.place';
import TextPlace from '@/partials/places/place/text.place';
import ServicesPlace from '@/partials/places/place/services.place';
import VisitorsPlace from '@/partials/places/place/visitors.place';
import ReviewsPlace from '@/partials/places/place/reviews.place';
import OwnerPlace from '@/partials/places/place/owner.place';
import ModifyPlace from '@/partials/places/modify.place';
import ActionsPlace from '@/partials/places/place/actions.place';
import { Metadata } from 'next';
import { getPlace } from '@/fetch/place.fetch';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateMetadata({
  params: { uuid, locale },
}: {
  params: {
    uuid: string;
    locale: string;
  };
}): Promise<Metadata> {
  let place: Place | null;

  console.log('METADATA', uuid, locale);

  try {
    place = await getPlace(uuid);
  } catch (e) {
    place = null;
  }

  if (!place) {
    notFound();
    return {
      title: '404 Place not found',
      description: 'Place not found',
    };
  }

  const images =
    place.images && place.images.length > 0 ? place.images : undefined;

  const meta = {
    title: place.name,
    description: place.description,
    twitter: {
      card: 'summary_large_image',
      site: '@lenslend',
      title: place.name,
      description: place.description,
      images: images?.map((image) => ({
        url: image.url,
        alt: image.alt,
      })),
    },
    openGraph: {
      title: `${place.name} | LensLend`,
      description: place.description,
      siteName: 'LensLend',
      images: images?.map((image) => ({
        url: image.url,
      })),
      type: 'website',
      locale: locale === 'bg' ? 'bg_BG' : 'en_US',
      alternateLocale: locale === 'bg' ? 'en_US' : 'bg_BG',
    },
  };

  console.log('META', meta);

  return meta;
}

const PlacePage = async ({
  params: { uuid },
}: {
  params: {
    uuid: string;
  };
}) => {
  if (!uuid) return null;

  const t = await getTranslations('place');
  let place: Place | null;

  try {
    place = await getPlace(uuid);
  } catch (e) {
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

  if (!place) {
    return notFound();
  }

  return (
    <>
      <div className='flex min-h-full flex-col gap-4 p-4'>
        <CloseButton />
        <Suspense fallback={null}>
          <ImagesPlace {...place} />
        </Suspense>
        <TextPlace {...place} />
        <ServicesPlace
          services={place.services.map((service) => service.service)}
        />
        <VisitorsPlace place={place} />
        <ReviewsPlace place={place} />
        <OwnerPlace place={place} />
        <Suspense fallback={null}>
          <ModifyPlace
            uuid={place.uuid}
            userUuid={place.owner.uuid ?? place.creator.uuid}
          />
        </Suspense>
      </div>
      <ActionsPlace
        ownerUuid={place.owner?.uuid}
        userUuid={place.creator.uuid}
        {...place}
      />
    </>
  );
};

export default PlacePage;
