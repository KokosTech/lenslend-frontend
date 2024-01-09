'use client';

import { fromLatLng, OutputFormat, setDefaults } from 'react-geocode';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';

interface GeocodingResult {
  results: {
    formatted_address: string;
  }[];
}

const Address = ({ lat, lng }: { lat: number; lng: number }) => {
  const [location, setLocation] = useState('');
  const locale = useLocale();

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    language: locale,
    outputFormat: OutputFormat.JSON,
  });

  useEffect(() => {
    fromLatLng(lat, lng)
      .then((res: GeocodingResult) => {
        if (res.results && res.results[0] && res.results[0].formatted_address) {
          setLocation(res.results[0].formatted_address);
        } else {
          console.error('Invalid geocoding response:', res);
        }
      })
      .catch((err: Error) => console.error(err));
  }, [lat, lng]);

  return <p className='break-words text-text-secondary'>{location} </p>;
};

export default dynamic(() => Promise.resolve(Address), {
  ssr: false,
});
