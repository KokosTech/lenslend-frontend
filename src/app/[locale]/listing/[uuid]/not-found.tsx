import Link from 'next/link';

export const metadata = {
  title: '404 - Няма такъв проект :(',
  description: '404 - Няма такъв проект :(',
  openGraph: {
    title: '404 - Няма такъв проект :(',
    description: '404 - Няма такъв проект :(',
    siteName: 'TUES Fest 2023',
  },
};

export default function NotFound() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-8'>
      <h2 className='bg-gradient bg-clip-text text-5xl font-black text-transparent'>
        404 - Няма такъв проект :(
      </h2>
      <Link
        href='/'
        className='text-white inline-flex items-center justify-center whitespace-nowrap rounded-md bg-[#353444] px-5 py-[10px] text-base font-semibold transition-all hover:bg-primary'
      >
        Върни се към проектите
      </Link>
    </div>
  );
}
