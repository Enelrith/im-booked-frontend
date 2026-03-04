import { AppointmentGet, Business, Service } from '../types';
import { useState } from 'react';
import AppointmentRow from './AppointmentRow';

export default function DisplayAppointments({
  appointments: initialAppointments,
  business,
  services,
}: {
  appointments: AppointmentGet[];
  business: Business;
  services: Service[];
}) {
  const [appointments, setAppointments] =
    useState<AppointmentGet[]>(initialAppointments);

  const handleDelete = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleUpdate = (updated: AppointmentGet) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
  };

  return (
    <>
      {appointments.map((appointment) => (
        <AppointmentRow
          key={appointment.id}
          appointment={appointment}
          business={business}
          services={services}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
      {appointments.length === 0 && (
        <tr>
          <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
            No appointments found
          </td>
        </tr>
      )}
    </>
  );
}
