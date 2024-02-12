import { API_URL } from '@/configs/api';
import { Category } from '@/types/forms/common.form';

const getCategory = async (uuid: string, type: 'LISTING' | 'PLACE') => {
  try {
    const res = await fetch(`${API_URL}/category/${type}/${uuid}`);

    if (!res.ok) {
      return null;
    }

    return (await res.json()) as Category;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default getCategory;
