import { AxiosResponse } from 'axios';
import { axiosInstance } from '@/configs/axios';

const fetcher = async <DataType>(url: string): Promise<DataType> => {
  const response: AxiosResponse<DataType> = await axiosInstance.get(url);
  return response.data;
};

export default fetcher;
