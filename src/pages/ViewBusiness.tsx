import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  AppointmentGet,
  AppointmentPost,
  Business,
  ErrorResponse,
  Service,
} from '../types';
import {
  addService,
  deleteService,
  updateService,
} from '../services/BusinessServices';
import { getBusiness } from '../services/BusinessView';
import {
  addAppointment,
  getAppointments,
} from '../services/BusinessAppointments';
import DisplayAppointments from '../components/DisplayAppointments';
import ServiceRow from '../components/ServiceRow';
import ServiceFooterRow from '../components/ServiceFooterRow';
import AppointmentFooterRow from '../components/AppointmentFooterRow';

export default function ViewBusiness() {
  const [business, setBusiness] = useState<Business>();
  const [services, setServices] = useState<Service[]>([]);
  const [appointments, setAppointments] = useState<AppointmentGet[]>([]);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const params = useParams();
  const id = params.id ? params.id : '';

  useEffect(() => {
    const fetchData = async (id: string) => {
      const [businessResponse, appointmentsResponse] = await Promise.all([
        getBusiness(id),
        getAppointments(id, 0),
      ]);

      if (businessResponse.status === 200) {
        setBusiness(businessResponse.data);
        setServices(businessResponse.data.services);
      } else {
        setError(businessResponse);
      }

      if (appointmentsResponse.status === 200) {
        setAppointments(appointmentsResponse.data.content);
      } else {
        setError(appointmentsResponse);
      }
    };

    fetchData(id);
  }, [id]);

  const handleUpdate = async (updatedService: Service) => {
    const response = await updateService(updatedService);

    if (response.status !== 200) {
      setError(response);
      alert(response.data.message);
    } else {
      setServices(
        services.map((service) =>
          service.id === updatedService.id ? updatedService : service
        )
      );
    }
  };

  const handleDelete = async (service: Service) => {
    const response = await deleteService(service);
    const id = service.id;

    if (response.status === 204) {
      setServices(services.filter((service) => service.id !== id));
      alert(`Service ${service.name} deleted`);
    } else {
      setError(response.data.message);
      alert(error);
    }
  };

  const handleAddService = async (business: Business, service: Service) => {
    const response = await addService(business, service);

    if (response.status === 201) {
      setServices([...services, response.data]);
    } else {
      setError(response.data.message);
      alert(response.data.message);
    }
  };

  const handleAddAppointment = async (
    business: Business,
    appointment: AppointmentPost
  ) => {
    const response = await addAppointment(business, appointment);

    if (response.status === 201) {
      setAppointments([...appointments, response.data]);
    } else {
      setError(response.data.message);
      alert(response.data.message);
    }
  };

  if (!business) return;
  return (
    <section className="ml-auto mr-auto mt-10 flex flex-col w-250 gap-y-6 pb-10">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
          <p className="text-red-400 text-sm">{`${error.message} (${error.status})`}</p>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-semibold text-gray-100">
          {business.name as string}
        </h2>
        {business.description && (
          <p className="mt-2 text-gray-400">{business.description as string}</p>
        )}
        <div className="flex mt-4 pt-4 border-t border-gray-700 text-sm text-gray-400 gap-x-4">
          {business.phone && <span>{business.phone}</span>}
          {(business.address || business.city || business.country) && (
            <span className="ml-auto flex gap-x-1">
              {business.address && `${business.address}, `}
              {business.city && `${business.city}, `}
              {business.country && `${business.country}`}
            </span>
          )}
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-gray-100">Services</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-800 text-gray-400 uppercase text-xs tracking-wider border-b border-gray-700">
              <th scope="col" className="px-4 py-3 text-left font-medium">
                Name
              </th>
              <th scope="col" className="px-4 py-3 text-left font-medium">
                Price
              </th>
              <th scope="col" className="px-4 py-3 text-left font-medium">
                Duration
              </th>
              <th scope="col" className="px-4 py-3 text-left font-medium">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-left font-medium"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {services.map((service) => (
              <ServiceRow
                key={service.id}
                service={service}
                onSave={(service) => {
                  handleUpdate(service);
                }}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
          <ServiceFooterRow
            business={business}
            onAddService={handleAddService}
          />
        </table>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700">
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-gray-100">Appointments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-225">
            <thead>
              <tr className="bg-gray-800 text-gray-400 uppercase text-xs tracking-wider">
                <th scope="col" className="px-4 py-3 text-left font-medium">
                  Client
                </th>
                <th scope="col" className="px-4 py-3 text-left font-medium">
                  Start
                </th>
                <th scope="col" className="px-4 py-3 text-left font-medium">
                  End
                </th>
                <th scope="col" className="px-4 py-3 text-left font-medium">
                  Service
                </th>
                <th scope="col" className="px-4 py-3 text-left font-medium">
                  Price
                </th>
                <th scope="col" className="px-4 py-3 text-left font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              <DisplayAppointments
                appointments={appointments}
                services={services}
                business={business}
              />
            </tbody>
            <AppointmentFooterRow
              services={services}
              onAddAppointment={(appointment) =>
                handleAddAppointment(business, appointment)
              }
            />
          </table>
        </div>
      </div>
    </section>
  );
}
