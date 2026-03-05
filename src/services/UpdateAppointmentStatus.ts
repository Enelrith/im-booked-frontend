import { AppointmentGet } from '../types';
import { axiosAuth } from './Axios';
import { getBackendUrl } from '../utils';
import { isAxiosError } from 'axios';

export async function updateAppointmentStatus(
  appointment: AppointmentGet,
  updatedStatus: string
) {
  try {
    return await axiosAuth.patch(
      `${getBackendUrl()}/api/appointments/${appointment.id}/status`,
      {
        status: updatedStatus,
      }
    );
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
  }
}
