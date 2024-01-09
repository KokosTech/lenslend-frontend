import { notFound } from 'next/navigation';

import Gallery from '@/components/project/gallery';
import ContactMap from '@/components/common/cards/components/client/maps';

import Cover from '@/partials/listings/listing/cover';
import Description from '@/partials/listings/listing/description';
import Profile from '@/partials/listings/listing/profile';

import getListing from '@/fetch/listing.fetch';

import { FullListingResponse } from '@/types/data/listing.type';
import React from 'react';
import PublishComment from '@/partials/listings/listing/publishComment';

const ListingPage = async ({
  params: { uuid },
}: {
  params: { uuid: string };
}) => {
  const listing: FullListingResponse | null = await getListing(uuid);

  if (!listing) notFound();

  const { title, images, user } = listing;
  const thumbnail = images && images.length > 0 ? { ...images[0] } : undefined;

  return (
    <div className='flex w-full flex-col justify-center gap-4 pb-4 pt-2 md:pt-8 lg:flex-row'>
      <div className='flex w-full max-w-screen-lg  flex-col items-center gap-4'>
        <Cover userUuid={user.uuid} image={thumbnail} {...listing} />
        {images && images.length > 1 && (
          <Gallery name={title} pictures={images} />
        )}
        <Description {...listing} />
        <PublishComment listingId={uuid} />
        {/* <Comments listingUUID={uuid} />*/}
      </div>
      <div className='flex flex-col items-center gap-4'>
        <Profile {...user} />
        <ContactMap {...listing} />
      </div>
    </div>
  );
};

export default ListingPage;
