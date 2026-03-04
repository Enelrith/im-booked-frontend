import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Business, Service } from '../types';
import { useState } from 'react';

interface ServiceFooterRowProps {
  business: Business;
  onAddService: (business: Business, service: Service) => void;
}

export default function ServiceFooterRow({
  business,
  onAddService,
}: ServiceFooterRowProps) {
  const [isCreating, setIsCreating] = useState<boolean>(true);
  const [newService, setNewService] = useState<Service>({
    id: '',
    name: '',
    price: 0,
    durationMinutes: 0,
    isActive: true,
  });
  return (
    <tfoot>
      <tr className="border-t border-gray-700 text-center h-12">
        {!isCreating && (
          <th scope="row" colSpan={5}>
            <button
              className="w-full hover:bg-gray-700/50 text-gray-400 hover:text-gray-100 transition-colors duration-150 h-12 flex items-center justify-center gap-x-2 text-sm"
              onClick={() => setIsCreating(true)}
            >
              <FontAwesomeIcon icon={faPlus} size="sm" />
              Add Service
            </button>
          </th>
        )}
        {isCreating && (
          <>
            <th className="px-4 py-2">
              <input
                type="text"
                className="bg-gray-600 text-gray-100 pl-2 rounded w-full outline-none border border-gray-500 focus:border-blue-500 placeholder-gray-400 text-sm"
                placeholder="Service Name"
                value={newService.name}
                onChange={(e) =>
                  setNewService((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </th>
            <td className="px-4 py-2">
              <input
                type="text"
                className="bg-gray-600 text-gray-100 pl-2 rounded w-full outline-none border border-gray-500 focus:border-blue-500 placeholder-gray-400 text-sm"
                placeholder="Price"
                value={newService.price}
                onChange={(e) =>
                  setNewService((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
              />
            </td>
            <td className="px-4 py-2">
              <input
                type="text"
                className="bg-gray-600 text-gray-100 pl-2 rounded w-full outline-none border border-gray-500 focus:border-blue-500 placeholder-gray-400 text-sm"
                placeholder="Duration (mins)"
                value={newService.durationMinutes}
                onChange={(e) =>
                  setNewService((prev) => ({
                    ...prev,
                    durationMinutes: Number(e.target.value),
                  }))
                }
              />
            </td>
            <td className="px-4 py-2">
              <select
                className="bg-gray-600 text-gray-100 rounded px-2 py-1 outline-none border border-gray-500 focus:border-blue-500 cursor-pointer text-sm w-full"
                value={newService.isActive ? 'Active' : 'Inactive'}
                onChange={(e) =>
                  setNewService((prev) => ({
                    ...prev,
                    isActive: e.target.value === 'Active',
                  }))
                }
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </td>
            <td className="px-4 py-2">
              <div className="flex justify-center gap-x-1">
                <button
                  className="p-1.5 hover:bg-gray-600 rounded-md transition-colors duration-150"
                  aria-label="Create Service"
                  onClick={() => {
                    onAddService(business, newService);
                    setIsCreating(false);
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} className="text-green-400" />
                </button>
                <button
                  className="p-1.5 hover:bg-gray-600 rounded-md transition-colors duration-150"
                  aria-label="Cancel Service Creation"
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
