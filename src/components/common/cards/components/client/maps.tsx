'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { IconGps } from '@tabler/icons-react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { useState } from 'react';

import Address from '@/components/common/address';
import LoadingMap from '@/components/common/map/loading.map';
import { GMAPS_API, GMAPS_ID } from '@/configs/google';

const ContactMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const t = useTranslations('listing');

  return (
    <APIProvider apiKey={GMAPS_API}>
      <div className='flex w-full flex-col gap-2 rounded-xl border-2 border-stroke bg-primary p-2'>
        <div className='relative aspect-video h-full w-full overflow-hidden rounded-lg border-2 border-stroke lg:w-80 xl:w-96'>
          <LoadingMap isLoading={!mapLoaded} />
          <Map
            zoom={15}
            center={{
              lat,
              lng,
            }}
            fullscreenControl={false}
            gestureHandling={'greedy'}
            streetViewControl={false}
            mapTypeControl={false}
            mapId={GMAPS_ID}
            onTilesLoaded={() => {
              if (!mapLoaded) setMapLoaded(true);
            }}
          >
            <Marker
              position={{
                lat,
                lng,
              }}
            />
          </Map>
        </div>
        <div className='flex flex-col gap-2 px-2 pb-2 lg:w-80 xl:w-96'>
          <Address lat={lat} lng={lng} />
          <Link
            className='text-md space-pre-wrap flex justify-center rounded-lg bg-blue/90 px-4 py-2 font-semibold text-primary hover:bg-blue'
            target='_blank'
            rel='noopener noreferrer'
            href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`}
          >
            <IconGps className='mr-2' />
            {t('get_directions')}
          </Link>
        </div>
      </div>
    </APIProvider>
  );
};

export default ContactMap;
