import { IconSortAscending } from '@tabler/icons-react';
import { User } from '@/types/data/place.type';
import React from 'react';
import {
  getLocale,
  getTranslations,
  unstable_setRequestLocale,
} from 'next-intl/server';
import Comment from '@/partials/listings/listing/comment';
import { API_URL } from '@/configs/api';
import {
  HTTPForbiddenException,
  HTTPUnauthorizedException,
} from '@/errors/HTTPExceptions';
import { getAuth } from '@/actions/auth';

type Comment = {
  id: string;
  content: string;
  user: User;
  created_at: string;
  updated_at: string;
};

const Comments = async ({ params: { uuid } }: { params: { uuid: string } }) => {
  const locale = await getLocale();
  unstable_setRequestLocale(locale);

  let comments: Comment[] | null = null;
  try {
    comments = await getComments(uuid);
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

const getComments = async (listingUUID: string) => {
  const auth = await getAuth();

  const res = await fetch(`${API_URL}/listing/${listingUUID}/comment`, {
    next: {
      tags: [`/listing/${listingUUID}/comment`],
    },
    headers: auth
      ? {
          Authorization: auth,
        }
      : {},
  });

  if (!res.ok) {
    switch (res.status) {
      case 401:
        throw new HTTPUnauthorizedException();
      case 403:
        throw new HTTPForbiddenException();
      case 404:
        return null;
    }

    throw new Error(`Could not fetch comments for listing ${listingUUID}`);
  }

  const comments = (await res.json()) as Comment[];
  console.log(comments);

  if (!comments) {
    throw new Error(`Could not fetch comments for listing ${listingUUID}`);
  }

  return comments;
};
export default Comments;
