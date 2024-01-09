import Service from '@/components/service';
import { Service as ServiceType } from '@/types/data/place.type';
import HorizontalDivider from '@/components/horizontalDivider';

const ServicesPlace = ({ services }: { services: ServiceType[] | null }) => {
  if (!services?.length) return null;
  return (
    <>
      <div className='flex gap-4'>
        {services.map((service) => (
          <Service key={service.service.uuid} {...service} />
        ))}
      </div>
      <HorizontalDivider />
    </>
  );
};

export default ServicesPlace;
