'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { API_URL } from '@/configs/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { canModify, getAuth } from '@/actions/auth';
import { IconEdit, IconTrash } from '@tabler/icons-react';

const ModifyPlace = ({
  uuid,
  userUuid,
}: {
  uuid: string;
  userUuid: string;
}) => {
  const router = useRouter();
  const t = useTranslations('listing.buttons');

  const [show, setShow] = useState<boolean | null>(null);

  const handleDelete = async () => {
    const res = await fetch(`${API_URL}/place/${uuid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: (await getAuth()) || '',
      },
    });

    if (res.ok) {
      router.push('/');
    }
  };

  useEffect(() => {
    const serverCheck = async (userUuid: string) => {
      const modify = await canModify(userUuid);
      setShow(modify);
    };

    void serverCheck(userUuid);
  }, [userUuid]);

  if (show === null) {
    return null; // skeleton
  }

  if (!show) {
    return null;
  }

  return (
    <div className='flex w-full gap-4'>
      <Link
        href={`/places/${uuid}/edit`}
        className='flex h-full w-full items-center justify-center gap-2 rounded-lg border border-stroke py-4 text-center font-semibold text-text-important transition-colors duration-200 ease-in-out hover:border-stroke-secondary'
      >
        <IconEdit size={20} />
        {t('edit')}
      </Link>
      <button
        type='button'
        onClick={handleDelete}
        className='flex h-full w-full items-center justify-center gap-2 rounded-lg border border-stroke py-4 text-center font-semibold text-error-primary transition-colors duration-200 ease-in-out hover:border-stroke-secondary'
      >
        <IconTrash size={20} />
        {t('delete')}
      </button>
    </div>
  );
};

export default ModifyPlace;
