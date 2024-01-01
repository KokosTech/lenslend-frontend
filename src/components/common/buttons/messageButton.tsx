import Link from 'next/link';
import { IconMessage2Dollar } from '@tabler/icons-react';

const MessageButton = ({ uuid }: { uuid: string }) => (
  <Link
    className='flex h-10 w-10 items-center justify-center rounded-sm bg-green transition-opacity duration-200 ease-in-out hover:opacity-90 md:h-12 md:w-12'
    href={`/messages/${uuid}`}
  >
    <IconMessage2Dollar className='h-6 w-6 text-background md:h-7 md:w-7' />
  </Link>
);

export default MessageButton;
