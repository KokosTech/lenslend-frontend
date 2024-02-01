'use client';

import { useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

import Address from '@/components/common/address';
import LoadingMap from '@/components/common/map/loading.map';
import HorizontalDivider from '@/components/horizontalDivider';

import { GMAPS_API, GMAPS_ID } from '@/configs/google';
import { LocationType } from '@/types/forms/create-listing.form';

type MapCreateProps = {
  location: LocationType | null;
  handleLocation: (location: LocationType) => void;
};

const MapCreate = ({ location, handleLocation }: MapCreateProps) => {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  return (
    <>
      <HorizontalDivider />
      <APIProvider apiKey={GMAPS_API}>
        <h4 className='text-lg font-bold'>Meetup point</h4>
        <div className='relative flex h-64 w-full flex-col gap-2 overflow-hidden rounded-lg border border-stroke bg-primary'>
          <LoadingMap isLoading={!mapLoaded} />
          <Map
            zoom={11}
            center={{
              lat: 42.6977,
              lng: 23.3219,
            }}
            fullscreenControl={false}
            gestureHandling={'greedy'}
            streetViewControl={false}
            mapTypeControl={false}
            className='h-full w-full focus:outline-none focus:ring-0'
            mapId={GMAPS_ID}
            onTilesLoaded={() => {
              setMapLoaded(true);
            }}
            onClick={(e) => {
              if (!e.detail.latLng) return;
              handleLocation({
                ...e.detail.latLng,
              });
              console.log(e);
            }}
          >
            {location && (
              <Marker
                position={{
                  ...location,
                }}
              />
            )}
          </Map>
        </div>
        {location && (
          <div className='rounded-lg border border-stroke bg-primary px-4 py-2'>
            <Address lat={location.lat} lng={location.lng} />
          </div>
        )}
      </APIProvider>
    </>
  );
};

export default MapCreate;
