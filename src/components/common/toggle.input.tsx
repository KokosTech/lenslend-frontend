import { ChangeEvent, ReactNode } from 'react';

type ToggleInputProps = {
  label: ReactNode;
  title: string;
  name: string;
  value: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ToggleInput = ({
  label,
  title,
  name,
  value,
  onChange,
  ...rest
}: ToggleInputProps) => (
  <div className='flex items-center justify-between gap-2' title={title}>
    {label}
    <label className='relative inline-flex cursor-pointer items-center'>
      <input
        type='checkbox'
        checked={value}
        name={name}
        className='peer sr-only'
        onChange={onChange}
        {...rest}
      />
      <div className="peer-checked:after:border-white after:bg-white peer h-10 w-16 rounded-full border border-stroke transition-colors duration-500 after:absolute after:start-[4px] after:top-1 after:h-8 after:w-8 after:rounded-full after:border after:border-stroke after:transition-all after:content-[''] peer-checked:bg-blue peer-checked:after:translate-x-6 peer-focus:ring-blue rtl:peer-checked:after:-translate-x-full"></div>
    </label>
  </div>
);
export default ToggleInput;
