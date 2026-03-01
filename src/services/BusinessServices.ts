import { axiosAuth } from './Axios';
import { getBackendUrl } from '../utils';
import { isAxiosError } from 'axios';
import { Business, Service } from '../types';

export async function addService(business: Business, service: Service) {
  try {
    return await axiosAuth.post(
      `${getBackendUrl()}/api/services/${business.id}`,
      {
        name: service.name,
        price: service.price,
        durationMinutes: service.durationMinutes,
        isActive: service.isActive,
      }
    );
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
  }
}

export async function updateService(updatedService: Service) {
  try {
    return await axiosAuth.patch(
      `${getBackendUrl()}/api/services/${updatedService.id}`,
      updatedService
    );
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
  }
}

export async function deleteService(service: Service) {
  try {
    return await axiosAuth.delete(
      `${getBackendUrl()}/api/services/${service.id}`
    );
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
  }
}
