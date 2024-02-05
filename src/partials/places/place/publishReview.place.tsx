import TextareaAutosize from 'react-textarea-autosize';
import FormErrors from '@/components/common/form/errors';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { useTranslations } from 'next-intl';
import postReview from '@/actions/review';
import HorizontalDivider from '@/components/horizontalDivider';
import StarInput from '@/components/common/star.input';

type PublishReviewPlaceProps = {
  placeUuid: string;
  setHasReview: (hasReview: boolean) => void;
};

export type ReviewState = {
  content: string;
  rating: number;
};

const reviewInitialState = {
  content: '',
  rating: 0,
};

const PublishReviewPlace = ({
  placeUuid,
  setHasReview,
}: PublishReviewPlaceProps) => {
  const [review, setReview] = useState<ReviewState>(reviewInitialState);

  const t = useTranslations('place.reviews');
  const postReviewAction = postReview.bind(null, placeUuid, review);

  const [state, formAction] = useFormState(postReviewAction, { messages: [] });

  useEffect(() => {
    console.log('form state', state);
    if (state === true) {
      setReview(reviewInitialState);
      setHasReview(true);
    }
  }, [state]);

  useEffect(() => {
    console.log('review', review);
  }, [review.rating]);

  return (
    <div className='flex w-full flex-col gap-4 rounded-xl text-justify'>
      <h4 className='text-xl font-semibold text-text'>{t('publish')}</h4>
      <form
        className='flex w-full flex-col items-center gap-4'
        action={formAction}
      >
        <TextareaAutosize
          name='content'
          id='content'
          className='w-full resize-none rounded-lg border border-stroke bg-primary p-4 transition hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none'
          placeholder={t('placeholder')}
          minRows={1}
          maxRows={5}
          rows={1}
          onChange={(e) =>
            setReview({
              ...review,
              content: e.target.value,
            })
          }
          value={review.content}
        />
        <div className='flex w-full items-center justify-between'>
          <div className='flex w-full gap-4'>
            <label className='text-text-secondary'>{t('rating')}</label>
            <StarInput
              value={review.rating}
              onChange={(value) =>
                setReview((prev) => ({
                  ...prev,
                  rating: value,
                }))
              }
            />
          </div>
          <button
            type='submit'
            className='rounded-lg border border-stroke bg-primary p-4 transition hover:border-stroke-secondary focus:border-stroke-secondary focus:outline-none'
          >
            {t('action')}
          </button>
        </div>
      </form>
      <FormErrors errors={state !== true ? state?.messages : undefined} t={t} />
      <HorizontalDivider />
    </div>
  );
};

export default PublishReviewPlace;
