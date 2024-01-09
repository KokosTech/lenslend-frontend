import { useLocale } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

const ChatsPage = () => {
  const locale = useLocale();
  unstable_setRequestLocale(locale);

  return (
    <div>
      {/* Chats section */}
      <section>chats</section>
      {/*  Selected chat section */}
      <section></section>
    </div>
  );
};

export default ChatsPage;
