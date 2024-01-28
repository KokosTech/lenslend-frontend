import Input from '@/components/common/input';
import { IconMail, IconPhone, IconRefresh } from '@tabler/icons-react';
import HorizontalDivider from '@/components/horizontalDivider';

const VerificationSection = () => (
  <>
    <div className='flex items-center gap-4 sm:w-96'>
      <Input
        id='verifyEmail'
        placeholder='verify email'
        type='text'
        name='verifyEmail'
        icon='Icon2fa'
        autoComplete='one-time-code'
      />
      <button
        type='button'
        className='flex aspect-square h-full items-center justify-center rounded-lg border border-stroke transition-colors hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none'
      >
        <IconRefresh />
      </button>
    </div>
    <button
      type='button'
      className='flex w-full items-center justify-center gap-4 rounded-lg border border-stroke bg-transparent p-4 text-sm transition-colors hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none'
    >
      <IconMail />
      Send verification code
    </button>
    <HorizontalDivider />
    {/* verify phone number */}
    <div className='flex items-center gap-4 sm:w-96'>
      <Input
        id='verifyPhone'
        placeholder='verify phone'
        type='text'
        name='verifyPhone'
        icon='Icon2fa'
        autoComplete='one-time-code'
      />
      <button
        type='button'
        className='flex aspect-square h-full items-center justify-center rounded-lg border border-stroke transition-colors hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none'
      >
        <IconRefresh />
      </button>
    </div>
    <button
      type='button'
      className='flex w-full items-center justify-center gap-4 rounded-lg border border-stroke bg-transparent p-4 text-sm transition-colors hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none'
    >
      <IconPhone />
      Send verification code
    </button>
  </>
);

export default VerificationSection;
