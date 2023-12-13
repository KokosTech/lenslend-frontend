import { useLocale } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

const Home = () => {
  const locale = useLocale();
  unstable_setRequestLocale(locale);

  console.log('Hello from src/app/page.tsx');
  return (
    <main className='flex min-h-screen flex-col items-center justify-center bg-background'>
      <h1 className='text-6xl font-bold'>
        <span className='text-green'>Lens</span>
        <span className='text-blue'>Lend</span>
      </h1>
    </main>
  );
};

export default Home;
