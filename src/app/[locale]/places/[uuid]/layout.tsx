const PlaceLayout = ({ children }: { children: React.ReactNode }) => (
  <div
    className={
      'no-scrollbar absolute h-full w-full gap-4 space-y-4 overflow-y-scroll rounded-xl border border-stroke bg-primary lg:relative lg:max-w-lg'
    }
  >
    <div className='relative h-full w-full'>{children}</div>
  </div>
);

export default PlaceLayout;
