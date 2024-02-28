'use server';

import { getAuth } from '@/actions/auth';
import { API_URL } from '@/configs/api';
import { revalidateTag } from 'next/cache';

export const rate = async (
  username: string,
  value: number,
  revalidate?: string,
) => {
  const auth = await getAuth('client');
  if (!auth) {
    return;
  }

  await fetch(`${API_URL}/user/rate/${username}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
    },
    body: JSON.stringify({
      rating: value,
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      console.log(data);
      revalidate && revalidateTag(revalidate);
      revalidateTag('users');
    });
};
