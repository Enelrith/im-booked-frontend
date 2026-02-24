import axios, { isAxiosError } from 'axios';
import { getBackendUrl } from '../utils';

export async function loginUser(email: string, password: string) {
  try {
    return await axios.post(
      `${getBackendUrl()}/api/auth`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
  } catch (error) {
    if (isAxiosError(error)) return error.response;
  }
}
