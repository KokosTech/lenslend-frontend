'use server';

import { revalidateTag } from 'next/cache';
import { getAuth } from '@/actions/auth';
import { unstable_noStore as noStore } from 'next/dist/server/web/spec-extension/unstable-no-store';
import { CreateCommentSchema } from '@/schemas/create-comment.schema';
import { API_URL } from '@/configs/api';
import extractServerErrors, {
  ExtractedServerErrors,
} from '@/utils/extractServerErrors';

export default async function postComment(
  listing_uuid: string,
  prevState: unknown,
  formData: FormData,
): Promise<
  | true
  | {
      messages: string[];
    }
> {
  noStore();

  const content = formData.get('comment') as string;

  if (!content || !listing_uuid) {
    return {
      messages: ['errors.empty'],
    };
  }

  const newContent = content.trim();

  const validatedData = CreateCommentSchema.safeParse({
    content: newContent,
  });

  if (!validatedData.success) {
    return {
      messages: validatedData.error.issues.map((issue) => issue.message),
    };
  }

  const auth = await getAuth();

  if (!auth) {
    return {
      messages: ['errors.unauthorized'],
    };
  }

  try {
    const res = await fetch(`${API_URL}/listing/${listing_uuid}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
      },
      body: JSON.stringify({
        content: newContent,
        listing_uuid,
      }),
    });

    if (res.status === 201) {
      revalidateTag(`/listing/${listing_uuid}/comment`);
      return true;
    } else {
      const extractedServerErrors: ExtractedServerErrors =
        await extractServerErrors(res);

      if (extractedServerErrors) {
        return {
          messages: Object.values(extractedServerErrors.errors).flat(),
        };
      }

      return {
        messages: ['errors.500'],
      };
    }
  } catch (err) {
    console.error('COMMENT ERRORS', err);
    return {
      messages: ['errors.500'],
    };
  }
}
