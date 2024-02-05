'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import TextareaAutosize from 'react-textarea-autosize';
import postComment from '@/actions/comment';
import { useFormState } from 'react-dom';
import FormErrors from '@/components/common/form/errors';

const PublishComment = ({ listingId }: { listingId: string }) => {
  const [comment, setComment] = useState('');
  const postCommentAction = postComment.bind(null, listingId);
  const [state, formAction] = useFormState(postCommentAction, { messages: [] });

  const t = useTranslations('listing.comments');

  useEffect(() => {
    console.log('form state', state);
    if (state === true) {
      setComment('');
    }
  }, [state]);

  return (
    <div className='w-full'>
      <div className='flex flex-col items-center justify-center gap-4 rounded-xl border-2 border-stroke bg-primary px-8 py-4 text-justify'>
        <form className='flex w-full items-center gap-4' action={formAction}>
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
        <FormErrors
          errors={state !== true ? state?.messages : undefined}
          t={t}
        />
      </div>
    </div>
  );
};

export default PublishComment;
