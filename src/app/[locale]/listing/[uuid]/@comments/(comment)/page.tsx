/* eslint-disable indent */

import { getAuth } from '@/actions/auth';
import {
  HTTPForbiddenException,
  HTTPUnauthorizedException,
} from '@/errors/HTTPExceptions';
import Comment from '@/partials/listings/listing/comment';
import { User } from '@/types/data/place.type';
import { IconSortAscending } from '@tabler/icons-react';
import {
  getLocale,
  getTranslations,
  unstable_setRequestLocale,
} from 'next-intl/server';
import { paginatedFetch } from '@/utils/paginated-fetch';
import PageOptions from '@/partials/common/pageOptions';

type Comment = {
  id: string;
  content: string;
  user: User;
  created_at: string;
  updated_at: string;
};

const Comments = async ({
  params: { uuid },
  searchParams: { page = 1, limit = 12 },
}: {
  params: { uuid: string };
  searchParams: {
    page: number;
    limit: number;
  };
}) => {
  const locale = await getLocale();
  unstable_setRequestLocale(locale);

  if (Number.isNaN(page) || Number.isNaN(limit)) {
    return <div>Invalid page or limit</div>;
  }

  let comments: Comment[] | null = null;
  let totalItes = 0;

  try {
    const data = await getComments(uuid, page, limit);
    comments = data.data;
    totalItes = data.totalCount;
  } catch (e) {
    if (
      e instanceof HTTPUnauthorizedException ||
      e instanceof HTTPForbiddenException
    ) {
      return null;
    }

    throw e;
  }

  const t = await getTranslations('listing.comments');

  if (!comments) {
    return <p>Could not load comments</p>;
  }

  if (comments.length === 0) {
    return (
      <div className='flex w-full justify-center gap-4'>
        <div className='flex w-full max-w-screen-lg flex-col gap-4'>
          <div className='flex items-center justify-center gap-4 rounded-xl border-2 border-stroke bg-primary px-8 py-4 text-justify lg:flex-row'>
            <h4 className='text-center text-lg font-medium text-text-important'>
              {t('none')}
            </h4>
          </div>
        </div>
        <div className='hidden flex-col items-center gap-4 lg:flex'>
          <div className='flex w-full flex-col gap-2 border-2 border-transparent p-2'>
            <div className='relative aspect-video h-full w-full  lg:w-80 xl:w-96'></div>
            <div className='flex w-full flex-col gap-2 px-2 pb-2 lg:w-80 xl:w-96' />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex w-full justify-center gap-4'>
      <div className='flex w-full max-w-screen-lg flex-col gap-4'>
        <div className='flex flex-col gap-4 rounded-xl border-2 border-stroke bg-primary px-8 py-4 text-justify'>
          <div className='flex items-center gap-8'>
            <p className='text-xl font-semibold'>
              {comments.length}{' '}
              {comments.length !== 1 ? t('plural') : t('singular')}
            </p>
            <button className='flex items-center gap-2 text-text-secondary'>
              <IconSortAscending />
              <p>{t('sortBy')}</p>
            </button>
          </div>
          <div className='flex flex-col gap-4'>
            {comments.map((comment) => (
              <Comment key={comment.id} {...comment} />
            ))}
          </div>
          <PageOptions page={page} limit={limit} totalItems={totalItes} />
        </div>
      </div>
      <div className='hidden flex-col items-center gap-4 lg:flex'>
        <div className='flex w-full flex-col gap-2 border-2 border-transparent p-2'>
          <div className='relative aspect-video h-full w-full  lg:w-80 xl:w-96'></div>
          <div className='flex w-full flex-col gap-2 px-2 pb-2 lg:w-80 xl:w-96' />
        </div>
      </div>
    </div>
  );
};


const getComments = async (
  listingUUID: string,
  page: number = 1,
  limit: number = 12,
) => {
  const auth = await getAuth('ssr');

  return paginatedFetch<Comment>(
    `/listing/${listingUUID}/comment`,
    page,
    limit,
    {
      next: {
        tags: [`/listing/${listingUUID}/comment`],
      },
      headers: auth
        ? {
            Authorization: auth,
          }
        : {},
    },
  );
};
export default Comments;
