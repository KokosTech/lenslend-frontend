import { Service } from '@/types/data/place.type';
import CustomIcon from '@/components/common/customIcon';

const Service = ({ service: { uuid, name, icon } }: Service) => {
  console.log(uuid);
  return (
    <div
      className='flex flex-col gap-1 rounded-lg border-2 border-stroke p-2'
      title={name}
    >
      <CustomIcon name={icon} className='h-12 w-12 text-text' />
    </div>
  );
};

export default Service;
