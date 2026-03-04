import { axiosAuth } from './Axios';
import { getBackendUrl } from '../utils';
import { isAxiosError } from 'axios';
import { AppointmentGet, AppointmentPost, Business } from '../types';

export async function getAppointments(
  businessId: string,
  pageNumber: number = 0
) {
  try {
    return await axiosAuth.get(
      `${getBackendUrl()}/api/appointments/${businessId}`,
      { params: { pageNumber } }
    );
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
  }
}

export async function addAppointment(
  business: Business,
  appointment: AppointmentPost
) {
  try {
    return await axiosAuth.post(
      `${getBackendUrl()}/api/appointments/${business.id}`,
      {
        clientName: appointment.clientName,
        appointmentStart: appointment.appointmentStart,
        appointmentEnd: appointment.appointmentEnd,
        serviceId: appointment.serviceId,
      }
    );
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
  }
}

export async function updateAppointment(
  business: Business,
  appointmentGet: AppointmentGet,
  appointmentPost: AppointmentPost
) {
  try {
    return await axiosAuth.patch(
      `${getBackendUrl()}/api/appointments/${business.id}/${appointmentGet.id}`,
      {
        clientName: appointmentPost.clientName,
        appointmentStart: appointmentPost.appointmentStart,
        appointmentEnd: appointmentPost.appointmentEnd,
        serviceId: appointmentPost.serviceId,
      }
    );
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
  }
}

export async function deleteAppointment(appointment: AppointmentGet) {
  try {
    return await axiosAuth.delete(
      `${getBackendUrl()}/api/appointments/${appointment.id}`
    );
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
  }
}
