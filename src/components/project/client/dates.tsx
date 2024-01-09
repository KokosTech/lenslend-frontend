'use client';

import { useFormatter, useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

const Dates = ({
  created_at,
  updated_at,
}: {
  created_at: string;
  updated_at: string;
}) => {
  const format = useFormatter();
  const t = useTranslations('common');

  const created = new Date(created_at);
  const updated = new Date(updated_at);

  return (
    <div className='space-y-2 text-sm text-text-secondary'>
      <p>
        {t('created_at')}{' '}
        {format.dateTime(created, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        })}
      </p>
      {updated_at !== created_at && (
        <p>
          {t('updated_at')}{' '}
          {format.dateTime(updated, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </p>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Dates), { ssr: false });
