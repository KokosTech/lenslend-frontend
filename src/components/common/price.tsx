import { formatPrice } from '@/utils/formatPrice';
import { useTranslations } from 'next-intl';

const Price = ({ price, rental }: { price?: number; rental?: number }) => {
  const t = useTranslations('listing');
  const currencyT = useTranslations('currency');

  return (
    <p className='flex flex-wrap text-lg font-semibold sm:text-xl xl:text-2xl'>
      <span className='mr-1.5 flex items-center break-keep text-sm text-text-secondary'>
        {currencyT('BGN')} {rental && `/ ${t('hour')}`}
      </span>
      {price ? <>{formatPrice(price)}</> : rental && <>{formatPrice(rental)}</>}
    </p>
  );
};

export default Price;
