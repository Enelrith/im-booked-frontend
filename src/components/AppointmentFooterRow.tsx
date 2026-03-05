import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { AppointmentPost, Service } from '../types';

export default function AppointmentFooterRow({
  services,
  onAddAppointment,
}: {
  services: Service[];
  onAddAppointment: (appointment: AppointmentPost) => void;
}) {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const [newAppointment, setNewAppointment] = useState<AppointmentPost>({
    clientName: '',
    appointmentStart: new Date().toLocaleString(),
    appointmentEnd: new Date().toLocaleString(),
    serviceId: services[0]?.id || null,
  });

  return (
    <tfoot>
      <tr className="border-t border-gray-700 text-center h-12">
        {!isCreating && (
          <th scope="row" colSpan={7}>
            <button
              className="w-full hover:bg-gray-700/50 text-gray-400 hover:text-gray-100 transition-colors duration-150 h-12 flex items-center justify-center gap-x-2 text-sm"
              onClick={() => setIsCreating(true)}
            >
              <FontAwesomeIcon icon={faPlus} size="sm" />
              Add Appointment
            </button>
          </th>
        )}
        {isCreating && (
          <>
            <th className="px-4 py-2 w-60">
              <input
                type="text"
                className="bg-gray-600 text-gray-100 pl-2 rounded w-full outline-none border border-gray-500 focus:border-blue-500 placeholder-gray-400 text-sm"
                placeholder="Client Name"
                value={newAppointment.clientName}
                onChange={(e) =>
                  setNewAppointment((prev) => ({
                    ...prev,
                    clientName: e.target.value, // was "name"
                  }))
                }
              />
            </th>
            <td className="px-4 py-2" colSpan={2}>
              <input
                type="datetime-local"
                className="bg-gray-600 text-gray-100 pl-2 rounded w-full outline-none border border-gray-500 focus:border-blue-500 text-sm"
                onChange={(e) =>
                  setNewAppointment((prev) => ({
                    ...prev,
                    appointmentStart: new Date(e.target.value).toISOString(),
                  }))
                }
              />
            </td>
            <td className="px-4 py-2" colSpan={2}>
              <input
                type="datetime-local"
                className="bg-gray-600 text-gray-100 pl-2 rounded w-full outline-none border border-gray-500 focus:border-blue-500 text-sm"
                onChange={(e) =>
                  setNewAppointment((prev) => ({
                    ...prev,
                    appointmentEnd: new Date(e.target.value).toISOString(),
                  }))
                }
              />
            </td>
            <td className="px-4 py-2">
              <select
                className="bg-gray-600 text-gray-100 rounded px-2 py-1 outline-none border border-gray-500 focus:border-blue-500 cursor-pointer text-sm w-full"
                onChange={(e) =>
                  setNewAppointment((prev) => ({
                    ...prev,
                    serviceId: e.target.value,
                  }))
                }
              >
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {`${service.name} (${service.durationMinutes} mins)`}
                  </option>
                ))}
              </select>
            </td>
            <td className="px-4 py-2">
              <div className="flex justify-center gap-x-1">
                <button
                  className="p-1.5 hover:bg-gray-600 rounded-md transition-colors duration-150"
                  onClick={() => {
                    onAddAppointment(newAppointment);
                    setIsCreating(false);
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} className="text-green-400" />
                </button>
                <button
                  className="p-1.5 hover:bg-gray-600 rounded-md transition-colors duration-150"
                  onClick={() => setIsCreating(false)}
                >
                  <FontAwesomeIcon icon={faXmark} className="text-red-400" />
                </button>
              </div>
            </td>
          </>
        )}
      </tr>
    </tfoot>
  );
}
