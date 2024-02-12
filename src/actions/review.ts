'use server';

import { getAuth } from '@/actions/auth';
import { API_URL } from '@/configs/api';
import { ReviewState } from '@/partials/places/place/publishReview.place';
import { CreateReviewSchema } from '@/schemas/create-review.schema';
import extractServerErrors from '@/utils/extractServerErrors';
import { revalidateTag } from 'next/cache';
import { unstable_noStore as noStore } from 'next/dist/server/web/spec-extension/unstable-no-store';

export default async function postReview(
  place_uuid: string,
  review: ReviewState,
): Promise<
  | true
  | {
      messages: string[];
    }
> {
  noStore();
  const { content, rating } = review;

  if (!rating || !place_uuid) {
    return {
      messages: ['errors.empty'],
    };
  }

  const newContent = content?.trim() || undefined;

  const validatedData = CreateReviewSchema.safeParse({
    content: newContent,
    rating,
  });

  if (!validatedData.success) {
    return {
      messages: validatedData.error.issues.map((issue) => issue.message),
    };
  }

  const auth = await getAuth('client');

  if (!auth) {
    return {
      messages: ['errors.unauthorized'],
    };
  }

  try {
    const res = await fetch(`${API_URL}/place/${place_uuid}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
      },
      body: JSON.stringify({
        content: newContent,
        rating,
      }),
    });

    console.log('auth', res.status);

    if (res.status === 201) {
      revalidateTag(`/place/${place_uuid}/review/my-review`);
      return true;
    }

    const errors = await extractServerErrors(res);

    if (errors) {
      return {
        messages: Object.values(errors.errors).flat(),
      };
    }

    console.log('====== RES =====', await res.json());

    return {
      messages: ['errors.server.unknown'],
    };
  } catch (e) {
    console.log(e);

    return {
      messages: ['errors.server.unknown'],
    };
  }
}
