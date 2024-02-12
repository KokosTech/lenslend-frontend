import { unstable_setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

const ChatsPage = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);

  const t = useTranslations('chats');

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-8'>
      <h2 className='bg-gradient bg-clip-text p-2 text-5xl font-black text-transparent'>
        {t('title')}
      </h2>
    </div>
  );
};

export default ChatsPage;
