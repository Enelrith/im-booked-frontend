import { AppointmentGet } from '../types';
import { updateAppointmentStatus } from '../services/UpdateAppointmentStatus';
import { Dispatch, RefObject, SetStateAction } from 'react';

export default function AppointmentStatusMenu({
  statusStyles,
  menuOpacity,
  appointment,
  setStatus,
  statusMenuRef,
}: {
  statusStyles: Record<string, string>;
  menuOpacity: string;
  appointment: AppointmentGet;
  setStatus: Dispatch<SetStateAction<string>>;
  statusMenuRef: RefObject<HTMLDivElement | null>;
}) {
  const handleClick = async (
    appointment: AppointmentGet,
    updatedStatus: string
  ) => {
    const response = await updateAppointmentStatus(appointment, updatedStatus);

    if (response.status === 200) {
      setStatus(updatedStatus);
    } else {
      alert('An error has occurred while updating appointment status');
    }
  };
  return (
    <div
      className={`flex flex-col z-10 bg-gray-900 rounded-md p-2 gap-y-5 absolute bottom-0 right-50 ${menuOpacity} transition`}
      ref={statusMenuRef}
    >
      <h3 className="text-center">Appointment Status</h3>
      <div className="flex gap-x-1">
        <button onClick={() => handleClick(appointment, 'COMPLETED')}>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles['COMPLETED'] ?? ''}`}
          >
            COMPLETED
          </span>
        </button>
        <button onClick={() => handleClick(appointment, 'CANCELLED')}>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles['CANCELLED'] ?? ''}`}
          >
            CANCELLED
          </span>
        </button>
        <button onClick={() => handleClick(appointment, 'SCHEDULED')}>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusStyles['SCHEDULED'] ?? ''}`}
          >
            SCHEDULED
          </span>
        </button>
      </div>
    </div>
  );
}
