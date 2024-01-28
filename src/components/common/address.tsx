'use client';

import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import useAddress from '@/hooks/useAddress';

const Address = ({ lat, lng }: { lat: number; lng: number }) => {
  const locale = useLocale();
  const location = useAddress(lat, lng, locale);

  return <span className='break-words text-text-secondary'>{location} </span>;
};

export default dynamic(() => Promise.resolve(Address), {
  ssr: false,
});
