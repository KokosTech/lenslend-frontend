import CustomIcon from '@/components/common/customIcon';
import { Service } from '@/types/data/place.type';

const Service = ({
  service: { name, icon },
  className,
  onClick,
}: {
  service: Service;
  className?: string;
  onClick?: () => void;
}) => (
  <div
    className={`${className} flex flex-col gap-1 rounded-lg border-2 border-stroke p-2`}
    title={name}
    onClick={onClick}
  >
    <CustomIcon name={icon} className='h-12 w-12 text-text' />
  </div>
);

export default Service;
