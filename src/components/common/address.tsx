'use client';

import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import useAddress from '@/hooks/useAddress';

const Address = ({
  lat,
  lng,
  size,
}: {
  lat: number;
  lng: number;
  size?: string;
}) => {
  const locale = useLocale();
  const location = useAddress(lat, lng, locale);

  return (
    <span className={`break-words break-words text-text-secondary ${size}`}>
      {location}
    </span>
  );
};

export default dynamic(() => Promise.resolve(Address), {
  ssr: false,
});
