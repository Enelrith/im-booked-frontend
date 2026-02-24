import axios, { isAxiosError } from 'axios';
import { getBackendUrl } from '../utils';

export async function registerUser(
  email: string,
  password: string,
  rePassword: string
) {
  try {
    return await axios.post(`${getBackendUrl()}/api/users`, {
      email,
      password,
      rePassword,
    });
  } catch (error) {
    if (isAxiosError(error)) return error.response;
  }
}
