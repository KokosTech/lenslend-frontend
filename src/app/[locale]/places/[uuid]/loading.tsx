import { IconPlaceholder } from '@tabler/icons-react';

const PlaceLoading = () => (
  <div className='no-scrollbar lg:max-w-l absolute h-full w-full gap-4 space-y-4 overflow-y-scroll rounded-xl border border-stroke bg-primary lg:relative'>
    <div className='h-full w-full'>
      <IconPlaceholder size={48} />
    </div>
  </div>
);

export default PlaceLoading;
