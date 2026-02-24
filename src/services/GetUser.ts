import { UUID } from 'node:crypto';
import { axiosAuth } from './Axios';
import { getBackendUrl } from '../utils';
import { isAxiosError } from 'axios';

export async function getUser(id: UUID) {
  try {
    const response = await axiosAuth.get(`${getBackendUrl()}/api/users/${id}`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) return error?.response;
  }
}
