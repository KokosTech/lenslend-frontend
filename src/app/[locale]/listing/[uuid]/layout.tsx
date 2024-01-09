import { ReactNode } from 'react';

const ListingLayout = ({
  listing,
  comments,
}: {
  listing: ReactNode;
  comments: ReactNode;
}) => (
  <div>
    <div className='flex w-full flex-col justify-center'>
      {listing}
      {comments}
    </div>
  </div>
);

export default ListingLayout;
