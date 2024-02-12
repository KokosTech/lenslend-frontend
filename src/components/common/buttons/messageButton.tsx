'use client';

import Link from 'next/link';
import { IconMessage2Dollar } from '@tabler/icons-react';

const MessageButton = ({ uuid, phone }: { uuid: string; phone: string }) => (
  <Link
    className='flex aspect-square h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-green transition-opacity duration-200 ease-in-out hover:opacity-90 sm:h-12 sm:w-12 lg:h-10 lg:w-10 xl:h-12 xl:w-12'
    href={`sms:${phone}?body=Hello, I'm interested in your listing. ${process.env.NEXT_PUBLIC_URL}/listing/${uuid}`}
    key={uuid}
  >
    <IconMessage2Dollar className='h-6 w-6 text-background md:h-7 md:w-7' />
  </Link>
);

export default MessageButton;
