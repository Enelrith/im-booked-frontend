import axios, { isAxiosError } from 'axios';
import { getBackendUrl, getFrontendUrl } from '../utils';

export const axiosAuth = axios.create({
  baseURL: getBackendUrl(),
});

export const setAuthHeader = (token: string) => {
  if (token) {
    axiosAuth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosAuth.defaults.headers.common['Authorization'];
  }
};

axiosAuth.interceptors.response.use(undefined, async (error) => {
  if (error.status === 401) {
    try {
      const response = await axios.post(
        `${getBackendUrl()}/api/auth/refresh`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) setAuthHeader(response.data.accessToken);

      return axiosAuth(error.config);
    } catch (error) {
      if (isAxiosError(error)) {
        window.location.href = `${getFrontendUrl()}/unauthorized`;
      }
    }
  }
  return Promise.reject(error);
});
