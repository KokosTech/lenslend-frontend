'use client';
import MarkersMap from '@/app/[locale]/places/markers.map';
import { GMAPS_ID } from '@/configs/google';
import type { ShortPlace } from '@/types/data/place.type';
import { PaginatedResponse } from '@/types/paginated-response.type';
import fetcher from '@/utils/fetcher';
import { IconMap } from '@tabler/icons-react';
import { Map } from '@vis.gl/react-google-maps';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

const MapsPartialPage = ({ uuid }: { uuid: string | null }) => {
  const router = useRouter();
  const t = useTranslations('place.map');

  const setOpenPlace = (newUuid: string | null) => {
    if (newUuid === uuid) {
      router.push('/places', {
        scroll: false,
      });
      return;
    }

    router.push(`/places${newUuid ? `/${newUuid}` : ''}`, {
      scroll: false,
    });
  };

  const {
    data,
    error,
    isLoading,
  }: {
    data: PaginatedResponse<ShortPlace> | undefined;
    error: undefined;
    isLoading: boolean;
  } = useSWR('/place?limit=99999', {
    fetcher: fetcher<PaginatedResponse<ShortPlace>>,
  });

  if (isLoading) {
    return (
      <div className='flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-stroke bg-primary font-semibold'>
        <IconMap size={48} className='animate-pulse' />
        <p className='animate-pulse'>{t('loading')}</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className='h-full w-full overflow-hidden rounded-xl border border-stroke bg-primary'>
        <h2>Could not load Google Maps</h2>
      </div>
    );
  }

  const places = data.data;

  return (
    <div className='h-full w-full overflow-hidden rounded-xl border border-stroke bg-primary'>
      <Map
        zoom={13}
        center={{
          lat: 42.6951,
          lng: 23.325,
        }}
        fullscreenControl={false}
        gestureHandling={'greedy'}
        streetViewControl={false}
        mapTypeControl={false}
        mapId={GMAPS_ID}
      >
        <MarkersMap data={places} setOpenPlace={setOpenPlace} />
      </Map>
    </div>
  );
};

export default MapsPartialPage;
