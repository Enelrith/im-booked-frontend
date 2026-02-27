import { axiosAuth } from './Axios';
import { getBackendUrl } from '../utils';
import { isAxiosError } from 'axios';

export async function getBusiness(id: string) {
  try {
    return await axiosAuth.get(`${getBackendUrl()}/api/businesses/${id}`);
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
  }
}
