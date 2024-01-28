import { useEffect, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { GMAPS_API } from '@/configs/google';

const loadScript = async (): Promise<void> => {
  const loader = new Loader({
    apiKey: GMAPS_API,
    version: 'weekly',
  });

  await loader.load();
};

const useAddress = (lat: number, lng: number, language: string): string => {
  const [address, setAddress] = useState('Loading...');

  const getAddressFromApi = async (
    lat: number,
    lng: number,
    language = 'en',
  ): Promise<google.maps.GeocoderResult> => {
    await loadScript();

    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(lat, lng);

    return new Promise((resolve, reject) => {
      try {
        void geocoder.geocode(
          {
            location: latlng,
            language,
          },
          (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              if (
                results &&
                results.length > 0 &&
                results[0].formatted_address
              ) {
                resolve(results[0]);
              } else {
                reject(new Error('Couldnt find the address'));
              }
            } else {
              reject(new Error(`Geocoder failed due to: ${status}`));
            }
          },
        );
      } catch (err) {
        reject(err);
      }
    });
  };

  useEffect(() => {
    const getAddress = async () => {
      try {
        const res = await getAddressFromApi(lat, lng, language);
        setAddress(res.formatted_address);
      } catch (err) {
        console.error(err);
      }
    };

    void getAddress();
  }, [lat, lng, setAddress]);

  return address;
};

export default useAddress;
