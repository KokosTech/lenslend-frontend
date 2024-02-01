import CustomIcon from '@/components/common/customIcon';
import { InputHTMLAttributes } from 'react';
import FormErrors from '@/components/common/form/errors';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  className?: string;
  icon?: string;
  errors?: string[];
  addClass?: string;
}

const Input = ({
  id,
  name,
  type,
  placeholder,
  className,
  icon,
  errors,
  addClass,
  ...props
}: InputProps) => (
  <div
    className={`flex shrink flex-col items-center gap-2 sm:w-96 ${addClass}`}
  >
    <div className='relative flex w-full shrink flex-col gap-2'>
      {icon && (
        <CustomIcon
          name={icon}
          className={`
          ${errors && errors.length > 0 && 'text-error-primary'}
          absolute left-4 top-1/2 -translate-y-1/2 transform`}
        />
      )}
      <input
        id={id}
        placeholder={placeholder}
        type={type}
        name={name}
        className={
          className ??
          `${
            errors &&
            errors.length > 0 &&
            '!hover:border-error-primary !focus:border-error-primary !border-error-secondary'
          }
          w-full rounded-lg border border-stroke bg-transparent p-4 ${icon && 'pl-12'} transition-colors hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none`
        }
        {...props}
      />
    </div>
    <FormErrors errors={errors} />
  </div>
);

export default Input;
