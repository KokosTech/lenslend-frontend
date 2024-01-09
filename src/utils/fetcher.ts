import { AxiosResponse } from 'axios';
import { axiosInstance } from '@/configs/axios';
import { API_URL } from '@/configs/api';

const fetcher = async <DataType>(url: string): Promise<DataType> => {
  const response: AxiosResponse<DataType> = await axiosInstance.get(
    API_URL + url,
  );
  return response.data;
};

export default fetcher;
