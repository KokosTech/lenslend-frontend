import { getAuth } from '@/actions/auth';

export const save = async (
  uuid: string,
  type: 'listing' | 'place',
): Promise<
  | boolean
  | {
      messages: string[];
    }
> => {
  const auth = await getAuth('client');

  if (!auth) {
    return {
      messages: ['unauthorized'],
    };
  }

  // POST to /{type}/{uuid}/save

  const res = await fetch(`/${type}/${uuid}/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth,
    },
  });

  if (res.status === 200) {
    const body = (await res.json()) as { saved: boolean };
    return body.saved;
  }

  return {
    messages: ['error'],
  };
};
