import Search from '@/partials/common/seatch';

const SearchWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className='flex w-full justify-center'>
    <div className='flex w-full max-w-screen-2xl flex-col gap-6 py-10'>
      <Search />
      {children}
    </div>
  </div>
);

export default SearchWrapper;
