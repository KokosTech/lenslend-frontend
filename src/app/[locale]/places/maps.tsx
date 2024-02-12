'use client';
import { useRouter } from 'next/navigation';
import { PaginatedResponse } from '@/types/paginated-response.type';
import type { ShortPlace } from '@/types/data/place.type';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { Map } from '@vis.gl/react-google-maps';
import { GMAPS_ID } from '@/configs/google';
import MarkersMap from '@/app/[locale]/places/markers.map';

const MapsPartialPage = ({ uuid }: { uuid: string | null }) => {
  const router = useRouter();

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
      <div className='h-full w-full overflow-hidden rounded-xl border border-stroke bg-primary'>
        <h2>Loading Google Maps...</h2>
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

  const setOpenPlace = (uuid: string | null) => {
    router.replace(`/places${uuid ? `/${uuid}` : ''}`, {
      scroll: false,
    });
  };

  return (
    <div className='h-full w-full overflow-hidden rounded-xl border border-stroke bg-primary'>
      <Map
        zoom={13}
        center={{
          lat: 42.6977,
          lng: 23.3219,
        }}
        fullscreenControl={false}
        gestureHandling={'greedy'}
        streetViewControl={false}
        mapTypeControl={false}
        mapId={GMAPS_ID}
      >
        <MarkersMap
          data={places}
          openPlace={uuid}
          setOpenPlace={setOpenPlace}
        />
      </Map>
    </div>
  );
};

export default MapsPartialPage;
