import { Business } from '../types';
import { getBackendUrl } from '../utils';
import { axiosAuth } from './Axios';
import { isAxiosError } from 'axios';

export async function createBusinessRequest(business: Business) {
  try {
    return await axiosAuth.post(`${getBackendUrl()}/api/users/businesses`, {
      name: business.name,
      email: business.email,
      phone: business.phone,
      description: business.description,
      address: business.address,
      city: business.city,
      country: business.country,
      isActive: business.isActive,
    });
  } catch (error) {
    if (isAxiosError(error)) return error.response?.data;
  }
}
