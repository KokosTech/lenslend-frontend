'use client';

import { useAutoAnimate } from '@formkit/auto-animate/react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { SWRConfig } from 'swr';

import MapsPartialPage from '@/app/[locale]/places/maps';

import { axiosInstance } from '@/configs/axios';
import { GMAPS_API } from '@/configs/google';

import type { ShortPlace } from '@/types/data/place.type';

const PlacesLayout = ({ children }: { children: React.ReactNode }) => {
  const [parent] = useAutoAnimate({
    duration: 500,
  });

  const params = useParams();
  const uuid = (params['uuid'] as string) || null;

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
          <MapsPartialPage uuid={uuid} />
          {children}
        </div>
      </APIProvider>
    </SWRConfig>
  );
};

export default PlacesLayout;
