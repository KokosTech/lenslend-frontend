import * as Icons from '@tabler/icons-react';
import { IconAlertHexagonOff } from '@tabler/icons-react';
import { ComponentType, CSSProperties, FC } from 'react';

type IconProps = {
  name: string;
  className?: string;
  style?: CSSProperties;
};

type CustomIconProps = {
  className?: string;
  style?: CSSProperties;
};

const CustomIcon: FC<IconProps> = ({ name, ...props }: IconProps) => {
  const SelectedIcon: ComponentType<CustomIconProps> =
    (Icons as unknown as { [key: string]: ComponentType<CustomIconProps> })[
      name
    ] || IconAlertHexagonOff;

  return (
    <SelectedIcon
      className={`h-6 w-6 text-background md:h-7 md:w-7 ${props.className}`}
      {...props}
    />
  );
};

export default CustomIcon;
