'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import TextareaAutosize from 'react-textarea-autosize';
import postComment from '@/actions/comment';

const PublishComment = ({ listingId }: { listingId: string }) => {
  const [comment, setComment] = useState('');
  const postCommentAction = postComment.bind(null, listingId);

  const t = useTranslations('listing.comments');

  return (
    <div className='w-full'>
      <div className='flex gap-4 rounded-xl border-2 border-stroke bg-primary text-justify'>
        <form
          className='flex w-full items-center gap-4 px-8 py-4'
          action={postCommentAction}
        >
          <TextareaAutosize
            name='comment'
            id='comment'
            className='w-full resize-none rounded-lg border border-stroke bg-primary px-4 py-2 transition hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none'
            placeholder={t('placeholder')}
            minRows={1}
            maxRows={5}
            rows={1}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <button
            type='submit'
            className='rounded-lg border border-stroke bg-primary px-4 py-2 transition hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none'
          >
            {t('action')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PublishComment;
