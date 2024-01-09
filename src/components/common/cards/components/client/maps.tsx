'use client';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import Link from 'next/link';
import { IconGps } from '@tabler/icons-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Address from '@/components/common/address';

const ContactMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const t = useTranslations('listing');

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}>
      <div className='flex w-full flex-col gap-2 rounded-xl border-2 border-stroke bg-primary p-2'>
        <div className='relative aspect-video h-full w-full overflow-hidden rounded-lg border-2 border-stroke lg:w-80 xl:w-96'>
          {!mapLoaded && (
            <div className='absolute inset-0 z-50 flex h-full w-full items-center justify-center'>
              <div className='rounded-lg border-2 border-stroke bg-primary px-4 py-2'>
                Map Loading...
              </div>
            </div>
          )}
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
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID as string}
            onTilesLoaded={() => {
              if (!mapLoaded) setMapLoaded(true);
            }}
          >
            <Marker
              position={{
                lat: 42.6977,
                lng: 23.3219,
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
            href={
              'https://www.google.com/maps/dir/?api=1&destination=42.6977,23.3219'
            }
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
