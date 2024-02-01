'use client';

import React, { useEffect, useState } from 'react';
import Input from '@/components/common/input';
import { IconChevronDown } from '@tabler/icons-react';

type Status = 'PUBLIC' | 'PRIVATE';

const StatusSelect = ({
  value,
  onChange,
}: {
  value: Status;
  onChange: (status: Status) => void;
}) => {
  const [show, setShow] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setShow(!show);
  };

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        show &&
        ref.current &&
        e.target instanceof Node &&
        !ref.current.contains(e.target)
      ) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [show]);

  return (
    <div className='relative w-1/2 shrink sm:w-1/3'>
      <Input
        id={'status'}
        name={'status'}
        type={'text'}
        placeholder='Status'
        value={value}
        addClass='!max-w-none !w-full'
        required={true}
      />
      <button
        onClick={handleClick}
        className='absolute bottom-2 right-2 rounded px-4 py-2 font-bold transition-colors duration-200 ease-in-out hover:text-blue'
      >
        <IconChevronDown size={24} />
      </button>
      {show && (
        <div className='absolute right-0 top-16 z-50 w-full rounded-lg border border-stroke bg-primary'>
          <div className='flex flex-col gap-2 p-2'>
            <button
              onClick={() => onChange('PUBLIC')}
              className='flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary hover:bg-blue'
            >
              <span>Public</span>
            </button>
            <button
              onClick={() => onChange('PRIVATE')}
              className='flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary hover:bg-blue'
            >
              <span>Private</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusSelect;
