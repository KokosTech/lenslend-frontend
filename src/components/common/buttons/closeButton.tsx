import { IconX } from '@tabler/icons-react';

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <div className='absolute right-6 top-6 w-[50px]'>
    <button
      className='fixed z-10 flex items-center justify-center rounded-md border border-stroke bg-primary p-2'
      onClick={onClick}
    >
      <IconX className='h-8 w-8 font-black text-text-important transition-colors duration-200 ease-in-out hover:text-blue md:h-7 md:w-7' />
    </button>
  </div>
);

export default CloseButton;
