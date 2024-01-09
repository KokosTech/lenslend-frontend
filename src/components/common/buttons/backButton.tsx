'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';
import { IconChevronLeft } from '@tabler/icons-react';

function BackButton({
  className,
  children,
}: PropsWithChildren<{
  className?: string;
}>) {
  const router = useRouter();
  return (
    <button
      className={className ?? 'rounded-lg border border-stroke bg-primary p-2'}
      onClick={() => router.back()}
    >
      {children ?? <IconChevronLeft />}
    </button>
  );
}

export default BackButton;
