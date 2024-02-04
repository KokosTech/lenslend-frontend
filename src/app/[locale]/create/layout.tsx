import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => (
  <div className='flex w-full justify-center'>{children}</div>
);

export default Layout;
