import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import Service from '@/components/service';
import { useState } from 'react';
import HorizontalDivider from '@/components/horizontalDivider';

type ServiceType = {
  uuid: string;
  name: string;
  icon: string;
};

const ServiceSelect = () => {
  const [selected, setSelected] = useState<ServiceType[]>([]);

  const {
    data,
    error,
    isLoading,
  }: {
    data: ServiceType[] | undefined;
    error: undefined;
    isLoading: boolean;
  } = useSWR('/service', {
    fetcher: fetcher<ServiceType[]>,
    keepPreviousData: true,
  });

  const handleSelect = (service: ServiceType) => {
    // remove service if already selected
    if (selected?.find((s) => s.uuid === service.uuid)) {
      setSelected((prevState) =>
        prevState?.filter((s) => s.uuid !== service.uuid),
      );
      return;
    }

    setSelected((prevState) =>
      prevState ? [...prevState, service] : [service],
    );
  };

  if (isLoading) {
    return <div>Loading services...</div>;
  }

  if (error || !data) {
    return <div>Error loading services...</div>;
  }

  return (
    <>
      <HorizontalDivider />
      <div className='flex w-full flex-col gap-4'>
        <h4 className='text-lg font-bold'>Services</h4>
        <div className='flex flex-wrap gap-2'>
          {data.map((service) => (
            <Service
              key={service.uuid}
              service={service}
              onClick={() => handleSelect(service)}
              className={`cursor-pointer !border transition-colors duration-200 ease-in-out hover:border-stroke-secondary
              ${selected?.find((s) => s.uuid === service.uuid) ? 'border-stroke-secondary bg-primary' : 'border-stroke bg-transparent'}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ServiceSelect;
