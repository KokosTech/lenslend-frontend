import { MouseEvent, ReactNode, useRef } from 'react';
import { IconX } from '@tabler/icons-react';
import HorizontalDivider from '@/components/horizontalDivider';

const Modal = ({
  children,
  onClose,
  title,
  addClass,
  ...props
}: {
  children: ReactNode;
  title: string;
  addClass?: string;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div
      className='bg-black fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-opacity-30 p-4 backdrop-blur-lg'
      onClick={(event) => onClick(event)}
      ref={modalRef}
      {...props}
    >
      <div
        className={`${addClass} flex flex-col gap-4 rounded-lg border border-primary bg-background p-8`}
      >
        <div className='flex items-center justify-between gap-4'>
          <h1 className='text-3xl font-bold'>{title}</h1>
          <button
            className='rounded-lg border border-stroke bg-primary p-2'
            onClick={() => onClose()}
          >
            <IconX className='h-8 w-8 font-black text-text-important transition-colors duration-200 ease-in-out hover:text-blue md:h-7 md:w-7' />
          </button>
        </div>
        <HorizontalDivider />
        {children}
      </div>
    </div>
  );
};

export default Modal;
