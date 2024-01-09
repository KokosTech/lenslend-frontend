import { Place } from '@/types/data/place.type';
import HorizontalDivider from '@/components/horizontalDivider';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { fromLatLng, OutputFormat, setDefaults } from 'react-geocode';
import { GMAPS_API } from '@/configs/google';
import Dates from '@/components/project/client/dates';
import Tag from '@/components/common/tag';

const TextPlace = ({
  name,
  icon,
  description,
  category,
  lat,
  lng,
  tags,
  created_at,
  updated_at,
}: Place) => {
  const locale = useLocale();
  const [location, setLocation] = useState('');

  setDefaults({
    key: GMAPS_API,
    language: locale,
    outputFormat: OutputFormat.JSON,
  });

  useEffect(() => {
    if (!lat || !lng) return;

    fromLatLng(lat, lng)
      .then((res) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        setLocation(res.results[0].formatted_address as string);
      })
      .catch((err) => console.log(err));
  }, [lat, lng]);

  return (
    <>
      <div className='flex flex-col gap-1'>
        <h2 className='text-2xl font-bold'>
          {icon} {name}
        </h2>
        <p className='text-text-secondary'>
          {location ? location : 'Loading...'}
        </p>
      </div>
      <HorizontalDivider />
      <div className='flex flex-col gap-4'>
        <div className='self-start rounded-lg border border-stroke px-3 py-1.5'>
          {category.name}
        </div>
        <p className=' whitespace-pre-wrap break-words text-text'>
          {description}
        </p>
        <div className='flex w-full flex-wrap items-end justify-end gap-4 text-text-secondary'>
          {tags?.map(({ tag }) => <Tag tag={tag} key={tag.uuid} />)}
        </div>
        <Dates created_at={created_at} updated_at={updated_at} />
      </div>
      <HorizontalDivider />
    </>
  );
};

export default TextPlace;
