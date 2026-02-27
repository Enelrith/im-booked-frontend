import { axiosAuth } from './Axios';
import { getBackendUrl } from '../utils';
import { isAxiosError } from 'axios';

export async function getBusinessThumbnails() {
  try {
    return await axiosAuth.get(`${getBackendUrl()}/api/businesses`);
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
  }
}
