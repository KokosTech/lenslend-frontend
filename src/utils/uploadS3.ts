import { API_URL } from '@/configs/api';

export const getSignedUrl = async (
  file: File,
  acl: 'public-read' | 'private',
  token: string,
) => {
  const res = await fetch(
    `${API_URL}/file/upload?name=${file.name}&type=${
      file.type.split('/')[1]
    }&acl=${acl}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

  if (!res.ok) {
    throw new Error('Something went wrong');
  }

  return (await res.json()) as {
    url: string;
    key: string;
    public_url: string;
  };
};

export const uploadS3 = async (file: File, url: string) => {
  const res = await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  return res.ok;
};
