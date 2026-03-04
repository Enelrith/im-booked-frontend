import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faPencil,
  faTrashCan,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { Service } from '../types';
import { useState } from 'react';

interface ServiceRowProps {
  service: Service;
  onSave: (service: Service) => void;
  onDelete: (service: Service) => void;
}

export default function ServiceRow({
  service,
  onSave,
  onDelete,
}: ServiceRowProps) {
  const [updatedService, setUpdatedService] = useState<Service>({
    id: service.id,
    name: service.name,
    price: service.price,
    durationMinutes: service.durationMinutes,
    isActive: service.isActive,
  });
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  return (
    <tr className="border-b border-gray-700/50 text-center hover:bg-gray-700/30 transition-colors duration-150">
      <th
        scope="row"
        className="font-normal pl-4 py-3 w-60 text-left text-gray-100"
      >
        {isUpdating ? (
          <input
            type="text"
            className="bg-gray-600 text-gray-100 pl-2 rounded w-full outline-none border border-gray-500 focus:border-blue-500"
            value={updatedService.name}
            onChange={(e) =>
              setUpdatedService((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <span>{service.name}</span>
        )}
      </th>
      <td className="px-4 py-3 text-gray-300">
        {isUpdating ? (
          <input
            type="text"
            className="bg-gray-600 text-gray-100 pl-2 rounded w-full outline-none border border-gray-500 focus:border-blue-500"
            value={updatedService.price}
            onChange={(e) =>
              setUpdatedService((prev) => ({
                ...prev,
                price: Number(e.target.value),
              }))
            }
          />
        ) : (
          <span>{service.price ? `€${service.price}` : '—'}</span>
        )}
      </td>
      <td className="px-4 py-3 text-gray-300">
        {isUpdating ? (
          <input
            type="text"
            className="bg-gray-600 text-gray-100 pl-2 rounded w-full outline-none border border-gray-500 focus:border-blue-500"
            value={updatedService.durationMinutes}
            onChange={(e) =>
              setUpdatedService((prev) => ({
                ...prev,
                durationMinutes: Number(e.target.value),
              }))
            }
          />
        ) : (
          <span>{service.durationMinutes} mins</span>
        )}
      </td>
      <td className="px-4 py-3">
        {isUpdating ? (
          <select
            className="bg-gray-600 text-gray-100 rounded px-2 py-1 outline-none border border-gray-500 focus:border-blue-500 cursor-pointer"
            value={updatedService.isActive ? 'Active' : 'Inactive'}
            onChange={(e) =>
              setUpdatedService((prev) => ({
                ...prev,
                isActive: e.target.value === 'Active',
              }))
            }
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        ) : (
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              service.isActive
                ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                : 'bg-red-500/15 text-red-400 border border-red-500/30'
            }`}
          >
            {service.isActive ? 'Active' : 'Inactive'}
          </span>
        )}
      </td>
      <td className="px-4 py-3 w-20">
        {!isUpdating && (
          <div className="flex justify-center gap-x-1">
            <button
              className="p-1.5 hover:bg-gray-600 rounded-md transition-colors duration-150"
              onClick={() => setIsUpdating(true)}
            >
              <FontAwesomeIcon
                icon={faPencil}
                className="text-gray-400 hover:text-gray-100"
                size="sm"
                aria-label="Edit Service"
              />
            </button>
            <button
              className="p-1.5 hover:bg-gray-600 rounded-md transition-colors duration-150"
              onClick={() => onDelete(service)}
            >
              <FontAwesomeIcon
                icon={faTrashCan}
                className="text-red-400"
                size="sm"
                aria-label="Delete Service"
              />
            </button>
          </div>
        )}
        {isUpdating && (
          <div className="flex justify-center gap-x-1">
            <button
              className="p-1.5 hover:bg-gray-600 rounded-md transition-colors duration-150"
              onClick={() => {
                onSave(updatedService);
                setIsUpdating(false);
              }}
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
