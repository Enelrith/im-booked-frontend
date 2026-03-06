import { axiosAuth } from './Axios';
import { getBackendUrl } from '../utils';
import { isAxiosError } from 'axios';

export async function logoutUser() {
  try {
    return await axiosAuth.post(`${getBackendUrl()}/api/auth/logout`);
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
  }
}
