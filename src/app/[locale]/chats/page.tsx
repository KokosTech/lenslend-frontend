import { useLocale } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

const ChatsPage = () => {
  const locale = useLocale();
  unstable_setRequestLocale(locale);
  return <div>Chats Page</div>;
};

export default ChatsPage;
