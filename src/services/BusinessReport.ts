import { axiosAuth } from './Axios';
import { getBackendUrl } from '../utils';
import { isAxiosError } from 'axios';

export async function getBusinessReport(businessId: string) {
  try {
    return await axiosAuth.get(`${getBackendUrl()}/api/reports/${businessId}`);
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
  }
}

export async function getPreviousMonthsBusinessReports(businessId: string) {
  try {
    return await axiosAuth.get(
      `${getBackendUrl()}/api/reports/${businessId}/previous`
    );
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
  }
}
