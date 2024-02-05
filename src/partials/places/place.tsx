'use client';

import useSWR from 'swr';

import ImagesPlace from '@/partials/places/place/images.place';
import TextPlace from '@/partials/places/place/text.place';
import ServicesPlace from '@/partials/places/place/services.place';
import VisitorsPlace from '@/partials/places/place/visitors.place';
import ReviewsPlace from '@/partials/places/place/reviews.place';
import OwnerPlace from '@/partials/places/place/owner.place';
import ActionsPlace from '@/partials/places/place/actions.place';
import ButtonsPlace from '@/partials/places/place/buttons.place';

import CloseButton from '@/components/common/buttons/closeButton';

import type { Place } from '@/types/data/place.type';

const Place = ({ uuid, onClose }: { uuid: string; onClose: () => void }) => {
  const { place, isLoading, error } = usePlace(uuid);

  // TODO Add loading and error states
  if (isLoading) {
    return (
      <div
        className={
          'no-scrollbar absolute h-full w-full gap-4 space-y-4 overflow-y-scroll rounded-xl border border-stroke bg-primary lg:relative lg:max-w-lg'
        }
      >
        <div className='relative h-full w-full'>
          <div className='flex min-h-full flex-col gap-4 p-4'>Loading</div>
        </div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div
        className={
          'no-scrollbar absolute h-full w-full gap-4 space-y-4 overflow-y-scroll rounded-xl border border-stroke bg-primary lg:relative lg:max-w-lg'
        }
      >
        <div className='relative h-full w-full'>
          <div className='flex min-h-full flex-col gap-4 p-4'>Error</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={
        'no-scrollbar absolute h-full w-full gap-4 space-y-4 overflow-y-scroll rounded-xl border border-stroke bg-primary lg:relative lg:max-w-lg'
      }
    >
      <div className='relative h-full w-full'>
        <div className='flex min-h-full flex-col gap-4 p-4'>
          <CloseButton onClick={onClose} />
          <ImagesPlace {...place} />
          <TextPlace {...place} />
          <ServicesPlace
            services={place.services.map((service) => service.service)}
          />
          <VisitorsPlace place={place} />
          <ReviewsPlace place={place} />
          <OwnerPlace place={place} />
          {/* TODO Last 3 Contributors */}
          <ButtonsPlace uuid={place.uuid} />
        </div>
        <ActionsPlace
          ownerUuid={place.owner?.uuid}
          userUuid={place.creator.uuid}
          {...place}
        />
      </div>
    </div>
  );
};

const usePlace = (uuid: string) => {
  const {
    data,
    error,
    isLoading,
  }: {
    data: Place | undefined;
    error: undefined;
    isLoading: boolean;
  } = useSWR(`/place/${uuid}`);

  return {
    place: data,
    isLoading,
    error,
  };
};
export default Place;
