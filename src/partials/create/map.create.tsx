'use client';

import { useState } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

import Address from '@/components/common/address';
import LoadingMap from '@/components/common/map/loading.map';
import HorizontalDivider from '@/components/horizontalDivider';

import { GMAPS_API, GMAPS_ID } from '@/configs/google';
import { LocationType } from '@/types/forms/create-listing.form';
import { useTranslations } from 'next-intl';

type MapCreateProps = {
  location: LocationType | null;
  handleLocation: (location: LocationType) => void;
  errors: {
    lat: string[];
    lng: string[];
  };
};

const MapCreate = ({ location, handleLocation, errors }: MapCreateProps) => {
  const t = useTranslations('create.listing.location');

  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  const handleMapLoaded = () => {
    setMapLoaded(true);
  };

  return (
    <>
      <HorizontalDivider />
      <APIProvider apiKey={GMAPS_API}>
        <h4 className='text-lg font-bold'>{t('title')}</h4>
        <div
          className={`relative flex h-64 w-full flex-col gap-2 overflow-hidden rounded-lg border bg-primary
          ${errors?.lat.length > 0 || errors?.lng.length > 0 ? 'border-2 border-error-primary' : 'border-stroke'}`}
        >
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
            onTilesLoaded={handleMapLoaded}
            onClick={(e) => {
              if (!e.detail.latLng) return;
              handleLocation({
                ...e.detail.latLng,
              });
            }}
          >
            {location?.lat && location?.lng && (
              <Marker
                position={{
                  lat: location.lat,
                  lng: location.lng,
                }}
              />
            )}
          </Map>
        </div>
        {(errors?.lat.length > 0 || errors?.lng.length > 1) && (
          <div className='text-center text-sm text-error-primary'>
            {errors.lat[0] ?? errors.lng[0]}
          </div>
        )}
        {location?.lat && location?.lng && (
          <div className='rounded-lg border border-stroke bg-primary px-4 py-2'>
            <Address lat={location.lat} lng={location.lng} />
          </div>
        )}
      </APIProvider>
    </>
  );
};

export default MapCreate;
