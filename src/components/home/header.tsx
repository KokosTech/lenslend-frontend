import Image from 'next/image';

const HeaderImage = () => (
  <div className='relative !aspect-[32/9] w-full overflow-hidden rounded-xl border border-stroke bg-primary p-4'>
    <Image
      src={
        'https://storage.lenslend.kaloyan.tech/og/Screenshot+2024-02-10+at+18.33.33.png'
      }
      alt={'header image'}
      layout='fill'
      className={'object-cover'}
    />
  </div>
);

export default HeaderImage;
