import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import Service from '@/components/service';
import HorizontalDivider from '@/components/horizontalDivider';

type ServiceType = {
  uuid: string;
  name: string;
  icon: string;
};

const ServiceSelect = ({
  title,
  selected,
  handleSelect,
}: {
  title: string;
  selected: ServiceType[];
  handleSelect: (service: ServiceType) => void;
}) => {
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
        <h4 className='text-lg font-bold'>{title}</h4>
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
