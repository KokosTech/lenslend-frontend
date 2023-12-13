import Image from 'next/image';

const logoComponent = () => (
  <div className='flex items-center gap-2.5'>
    <Image
      src='/assets/icons/icon-less.png'
      alt='LensLend Logo'
      width={52}
      height={52}
    />
    <span className='bg-gradient bg-clip-text text-2xl font-black text-transparent'>
      LensLend
    </span>
  </div>
);

export default logoComponent;
