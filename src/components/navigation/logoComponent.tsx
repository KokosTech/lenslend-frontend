import Image from 'next/image';

const logoComponent = () => (
  <div className='flex items-center gap-2.5'>
    <Image
      src='/assets/icons/icon-less.png'
      alt='LensLend Logo'
      width={52}
      height={52}
    />
    <span className='font-black text-2xl bg-gradient text-transparent bg-clip-text'>
      LensLend
    </span>
  </div>
);

export default logoComponent;
