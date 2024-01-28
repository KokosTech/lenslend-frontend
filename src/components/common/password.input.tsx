'use client';

import Input, { InputProps } from '@/components/common/input';
import { useState } from 'react';
import CustomIcon from '@/components/common/customIcon';

const PasswordInput = (props: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative'>
      <Input {...props} type={showPassword ? 'text' : 'password'} />
      <button
        type='button'
        onClick={() => setShowPassword(!showPassword)}
        className='absolute right-4 top-[1.85rem] -translate-y-1/2 transition-colors focus:!text-text-important focus:outline-none'
      >
        <CustomIcon
          name={showPassword ? 'IconEye' : 'IconEyeOff'}
          className='h-6 w-6 text-text-secondary transition-colors hover:text-text-important'
        />
      </button>
    </div>
  );
};

export default PasswordInput;
