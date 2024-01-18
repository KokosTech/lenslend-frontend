'use server';

import { axiosInstance } from '@/configs/axios';
import { revalidateTag } from 'next/cache';
import { getAuth } from '@/actions/auth';

export default async function postComment(
  listing_uuid: string,
  formData: FormData,
) {
  const content = formData.get('comment');
  console.log('COMMENT', content, listing_uuid);

  if (!content || !listing_uuid) {
    throw new Error('Invalid form data');
  }

  const { accessToken } = await getAuth();

  if (!accessToken) {
    throw new Error('Access token is missing');
  }

  try {
    const res = await axiosInstance.post(
      `/listing/${listing_uuid}/comment`,
      {
        content,
        listing_uuid,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (res.status === 201) {
      revalidateTag(`/listing/${listing_uuid}/comment`);
    }
  } catch (err) {
    throw err;
  }
}
