'use client';

import { useFormatter } from 'next-intl';
import dynamic from 'next/dynamic';

const DateComponent = ({ date }: { date: string }) => {
  const format = useFormatter();
  const newDate = new Date(date);

  if (newDate.toString() === 'Invalid Date') return null;

  return (
    <>
      {format.dateTime(newDate, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </>
  );
};

export default dynamic(() => Promise.resolve(DateComponent), { ssr: false });
