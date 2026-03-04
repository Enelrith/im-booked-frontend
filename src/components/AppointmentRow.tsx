import { AppointmentGet, AppointmentPost, Business, Service } from '../types';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faPencil,
  faTrashCan,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  updateAppointment,
  deleteAppointment,
} from '../services/BusinessAppointments';

const statusStyles: Record<string, string> = {
  SCHEDULED: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
  COMPLETED: 'bg-green-500/15 text-green-400 border border-green-500/30',
  CANCELLED: 'bg-red-500/15 text-red-400 border border-red-500/30',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function toDatetimeLocal(isoStr: string) {
  const date = new Date(isoStr);
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export default function AppointmentRow({
  appointment,
  business,
  services,
  onDelete,
  onUpdate,
}: {
  appointment: AppointmentGet;
  business: Business;
  services: Service[];
  onDelete: (id: string) => void;
  onUpdate: (updated: AppointmentGet) => void;
}) {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updatedAppointment, setUpdatedAppointment] = useState<AppointmentPost>(
    {
      clientName: appointment.clientName,
      appointmentStart: appointment.appointmentStart,
      appointmentEnd: appointment.appointmentEnd,
      serviceId: null,
    }
  );

  const handleSave = async () => {
    const response = await updateAppointment(
      business,
      appointment,
      updatedAppointment
    );
    if (response?.status === 200) {
      onUpdate(response.data);
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    const response = await deleteAppointment(appointment);
    if (response?.status === 204) {
      onDelete(appointment.id);
    }
  };

  const isAppointmentExpired = (appointment: AppointmentGet) => {
    return new Date() > new Date(appointment.appointmentEnd);
  };

  return (
    <tr className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors duration-150">
      <th scope="row" className="px-4 py-3 font-medium text-gray-100 text-left">
        {isUpdating ? (
          <input
            type="text"
            className="bg-gray-600 text-gray-100 pl-2 rounded w-full outline-none border border-gray-500 focus:border-blue-500 text-sm"
            value={updatedAppointment.clientName}
            onChange={(e) =>
              setUpdatedAppointment((prev) => ({
                ...prev,
                clientName: e.target.value,
              }))
            }
          />
        ) : (
          appointment.clientName
        )}
      </th>
      <td className="px-4 py-3 text-gray-300">
        {isUpdating ? (
          <input
            type="datetime-local"
            className="bg-gray-600 text-gray-100 pl-2 rounded w-46 outline-none border border-gray-500 focus:border-blue-500 text-sm"
            defaultValue={toDatetimeLocal(appointment.appointmentStart)}
            onChange={(e) =>
              setUpdatedAppointment((prev) => ({
                ...prev,
                appointmentStart: new Date(e.target.value).toISOString(),
              }))
            }
          />
        ) : (
          formatDate(appointment.appointmentStart)
        )}
      </td>
      <td className="px-4 py-3 text-gray-300">
        {isUpdating ? (
          <input
            type="datetime-local"
            className="bg-gray-600 text-gray-100 pl-2 rounded w-46 outline-none border border-gray-500 focus:border-blue-500 text-sm"
            defaultValue={toDatetimeLocal(appointment.appointmentEnd)}
            onChange={(e) =>
              setUpdatedAppointment((prev) => ({
                ...prev,
                appointmentEnd: new Date(e.target.value).toISOString(),
              }))
            }
          />
        ) : (
          formatDate(appointment.appointmentEnd)
        )}
      </td>
      <td className="px-4 py-3 text-gray-300">
        {isUpdating ? (
          <select
            className="bg-gray-600 text-gray-100 rounded px-2 py-1 outline-none border border-gray-500 focus:border-blue-500 cursor-pointer text-sm min-w-24 w-fit"
            onChange={(e) =>
              setUpdatedAppointment((prev) => ({
                ...prev,
                serviceId: e.target.value || null,
              }))
            }
          >
            <option value="">—</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        ) : (
          (appointment.serviceName ?? '—')
        )}
      </td>
      <td className="px-4 py-3 text-gray-300">
        {appointment.servicePrice ? `€${appointment.servicePrice}` : '—'}
      </td>
      <td className="px-4 py-3 flex justify-between mt-2">
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles[appointment.status] ?? ''}`}
        >
          {appointment.status}
        </span>
        {isAppointmentExpired(appointment) && (
          <span
            className="text-yellow-400 font-semibold w-5 outline-1 outline-yellow-600 rounded-full text-center hover:cursor-pointer"
            title="The end date of this appointment has passed!"
          >
            !
          </span>
        )}
      </td>
      <td className="px-4 py-3 w-20">
        {!isUpdating ? (
          <div className="flex justify-center gap-x-1">
            <button
              className="p-1.5 hover:bg-gray-600 rounded-md transition-colors duration-150"
              onClick={() => setIsUpdating(true)}
            >
              <FontAwesomeIcon
                icon={faPencil}
                className="text-gray-400 hover:text-gray-100"
                size="sm"
                aria-label="Edit Appointment"
              />
            </button>
            <button
              className="p-1.5 hover:bg-gray-600 rounded-md transition-colors duration-150"
              onClick={handleDelete}
            >
              <FontAwesomeIcon
                icon={faTrashCan}
                className="text-red-400"
                size="sm"
                aria-label="Delete Appointment"
              />
            </button>
          </div>
        ) : (
          <div className="flex justify-center gap-x-1">
            <button
              className="p-1.5 hover:bg-gray-600 rounded-md transition-colors duration-150"
              onClick={handleSave}
            >
              <FontAwesomeIcon
                icon={faCheck}
                className="text-green-400"
                size="sm"
                aria-label="Apply Changes"
              />
            </button>
            <button
              className="p-1.5 hover:bg-gray-600 rounded-md transition-colors duration-150"
              onClick={() => setIsUpdating(false)}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="text-red-400"
                size="sm"
                aria-label="Cancel Changes"
              />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
