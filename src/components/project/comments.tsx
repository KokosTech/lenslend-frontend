import Image from 'next/image';

import { IconSortAscending } from '@tabler/icons-react';
import { User } from '@/types/data/place.type';

type Comment = {
  id: string;
  content: string;
  user: User;
};

const Comments = async ({ listingUUID }: { listingUUID: string }) => {
  const comments = await getComments(listingUUID);

  if (!comments) {
    return <p>Could not load comments</p>;
  }

  if (comments.length === 0) {
    return <p>No comments yet</p>;
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-4 rounded-xl border-2 border-stroke bg-primary px-8 py-4 text-justify'>
        <div className='flex items-center gap-8'>
          <p className='text-xl font-semibold'>
            {comments.length} {comments.length !== 1 ? 'Comments' : 'Comment'}
          </p>
          <button className='flex items-center gap-2 text-text-secondary'>
            <IconSortAscending />
            Sort by
          </button>
        </div>
        <div className='flex flex-col gap-4'>
          {comments.map((comment) => (
            <div
              key={comment.id}
              className='flex gap-4 rounded-xl border border-stroke bg-primary p-2 text-justify'
            >
              <div className='flex items-center gap-4'>
                {comment.user.profile_pic && (
                  <div className='relative h-12 w-12 overflow-hidden rounded-full border border-stroke'>
                    <Image
                      src={comment.user.profile_pic}
                      alt='profile_pic'
                      layout='fill'
                      className='object-cover object-center'
                    />
                  </div>
                )}
                <div className='flex flex-col gap-1'>
                  <div className='flex items-center gap-2'>
                    <p className='font-semibold'>{comment.user.name}</p>
                    <p className='text-text-secondary'>
                      @{comment.user.username}
                    </p>
                  </div>
                  <p className='text-text-secondary'>{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getComments = async (listingUUID: string) => {
  const res = await fetch(
    `${process.env.API_URL}/listing/${listingUUID}/comment`,
  );

  if (!res.ok) {
    throw new Error(`Could not fetch comments for listing ${listingUUID}`);
  }

  const comments = (await res.json()) as Comment[];

  if (!comments) {
    throw new Error(`Could not fetch comments for listing ${listingUUID}`);
  }

  return comments;
};
export default Comments;
