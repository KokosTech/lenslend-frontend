'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';
import useSWR, { SWRConfig } from 'swr';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

import { axiosInstance } from '@/configs/axios';
import { GMAPS_API, GMAPS_ID } from '@/configs/google';

import Place from '@/partials/places/place';

import type { ShortPlace } from '@/types/data/place.type';

import fetcher from '@/utils/fetcher';
import MarkersMap from '@/app/[locale]/places/markers.map';
import { PaginatedResponse } from '@/types/paginated-response.type';

const PlacesPage = ({
  searchParams: { uuid },
}: {
  searchParams: {
    uuid: string;
  };
}) => {
  const [openPlace, setOpenPlace] = useState<string | null>(null);
  const [parent] = useAutoAnimate({
    duration: 500,
  });

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
    // TODO: Skeleton
    return <div>Loading...</div>;
  }

  if (error || !data) {
    // TODO: Error page
    console.log(error);
    return <div>Error:</div>;
  }

  const places = data.data;

  return (
    <SWRConfig
      value={{
        fetcher: async (url: string) => {
          try {
            const res = await axiosInstance.get(url);
            return res.data as ShortPlace[];
          } catch (err) {
            if (err instanceof Error) {
              throw err;
            } else if (err instanceof AxiosError) {
              throw err.response?.data;
            } else {
              throw err;
            }
          }
        },
      }}
    >
      <APIProvider apiKey={GMAPS_API}>
        <div
          className='flex h-[calc(100vh-7rem)] w-full gap-4 md:h-[calc(100vh-2rem)]'
          ref={parent}
        >
          <div className='h-full w-full overflow-hidden rounded-xl border border-stroke'>
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
                openPlace={openPlace}
                setOpenPlace={setOpenPlace}
              />
            </Map>
          </div>
          {openPlace && (
            <Place uuid={openPlace} onClose={() => setOpenPlace(null)} />
          )}
        </div>
      </APIProvider>
    </SWRConfig>
  );
};

export default PlacesPage;
