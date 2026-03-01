import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Business, ErrorResponse, Service } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faPencil,
  faPlus,
  faTrashCan,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  addService,
  deleteService,
  updateService,
} from '../services/BusinessServices';
import { getBusiness } from '../services/BusinessView';

export default function ViewBusiness() {
  const [business, setBusiness] = useState<Business>();
  const [services, setServices] = useState<Service[]>([]);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [updatingServiceId, setUpdatingServiceId] = useState<string>();
  const [updatedName, setUpdatedName] = useState<string>('');
  const [updatedPrice, setUpdatedPrice] = useState<number>(0);
  const [updatedDuration, setUpdatedDuration] = useState<number>(0);
  const [updatedStatus, setUpdatedStatus] = useState<boolean>(false);
  const [newService, setNewService] = useState<Service>({
    id: '',
    name: '',
    price: 0,
    durationMinutes: 0,
    isActive: false,
  });
  const [error, setError] = useState<ErrorResponse | null>(null);

  const params = useParams();
  const id = params.id ? params.id : '';

  useEffect(() => {
    const getBusinessResponse = async (id: string) => {
      const response = await getBusiness(id);

      if (response.status === 200) {
        setBusiness(response.data);
        setServices(response.data.services);
      } else {
        setError(response);
      }
    };

    getBusinessResponse(id);
  }, [id]);

  const handleUpdate = async (service: Service) => {
    service.name = updatedName;
    service.price = updatedPrice;
    service.durationMinutes = updatedDuration;
    service.isActive = updatedStatus;

    const response = await updateService(service);

    if (response.status !== 200) {
      setError(response);
      alert(response.data.message);
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

  if (!business) return;
  return (
    <section className="bg-gray-700 ml-auto mr-auto mt-10 flex flex-col w-200 rounded-sm p-2 h-fit">
      {error && (
        <p className="text-red-500">{`${error.message} (${error.status})`}</p>
      )}
      <h2 className="ml-auto mr-auto text-2xl font-semibold ">
        {`${business.name}`}
      </h2>
      <p className="mt-5">{`${business.description}`}</p>
      <div>
        <h3 className="mt-5 text-xl font-semibold pb-2">Services</h3>
        <table className="w-full border border-gray-600">
          <thead className="text-center border border-gray-600">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Duration (mins)</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                key={service.id}
                className="border-b border-gray-600 text-center"
              >
                <th scope="row" className="font-normal pl-2 w-60">
                  {isUpdating && updatingServiceId === service.id ? (
                    <input
                      type="text"
                      className="bg-gray-200 text-gray-900 pl-0.5"
                      value={updatedName}
                      onChange={(e) => {
                        setUpdatedName(e.target.value);
                      }}
                    ></input>
                  ) : (
                    <p>{service.name}</p>
                  )}
                </th>
                <td className="pl-2">
                  {isUpdating && updatingServiceId === service.id ? (
                    <input
                      type="text"
                      className="bg-gray-200 w-full text-gray-900 pl-0.5"
                      value={updatedPrice}
                      onChange={(e) => setUpdatedPrice(Number(e.target.value))}
                    ></input>
                  ) : (
                    <p>{service.price}</p>
                  )}
                </td>
                <td className="pl-2">
                  {isUpdating && updatingServiceId === service.id ? (
                    <input
                      type="text"
                      className="bg-gray-200 w-full text-gray-900 pl-0.5"
                      value={updatedDuration}
                      onChange={(e) =>
                        setUpdatedDuration(Number(e.target.value))
                      }
                    ></input>
                  ) : (
                    <p>{service.durationMinutes}</p>
                  )}
                </td>
                <td className="pl-2">
                  {isUpdating && updatingServiceId === service.id ? (
                    <select
                      name="is-active"
                      className="bg-gray-100 h-6 pl-2 text-gray-900 hover:cursor-pointer"
                      value={updatedStatus ? 'Active' : 'Inactive'}
                      onChange={(e) => {
                        setUpdatedStatus(e.target.value === 'Active');
                      }}
                    >
                      <option className="text-gray-900">Active</option>
                      <option className="text-gray-900">Inactive</option>
                    </select>
                  ) : (
                    <p>{service.isActive ? 'Active' : 'Inactive'}</p>
                  )}
                </td>
                <td className="w-30">
                  {!isUpdating && (
                    <>
                      <button
                        className="hover:bg-gray-200 hover:text-gray-900 transition rounded-lg"
                        onClick={() => {
                          setIsUpdating(true);
                          setUpdatingServiceId(service.id);
                          setUpdatedName(service.name);
                          setUpdatedPrice(service.price);
                          setUpdatedDuration(service.durationMinutes);
                          setUpdatedStatus(service.isActive);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faPencil}
                          aria-label="Edit Service"
                          size="sm"
                        />
                      </button>
                      <button
                        className="hover:bg-gray-200 transition rounded-lg"
                        onClick={() => handleDelete(service)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="text-red-500"
                          aria-label="Delete Service"
                          size="sm"
                        />
                      </button>
                    </>
                  )}
                  {isUpdating && updatingServiceId === service.id && (
                    <>
                      <button
                        className="hover:bg-gray-200 hover:text-gray-900 transition rounded-lg"
                        onClick={() => {
                          handleUpdate(service);
                          setIsUpdating(false);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-green-500"
                          aria-label="Apply Changes"
                          size="sm"
                        />
                      </button>
                      <button
                        className="hover:bg-gray-200 transition rounded-lg"
                        onClick={() => {
                          setIsUpdating(false);
                          console.log(
                            `${isUpdating}, ${updatingServiceId}, ${service.id}`
                          );
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="text-red-500"
                          aria-label="Cancel Changes"
                          size="sm"
                        />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="text-center h-14">
              {!isCreating && (
                <th scope="row" colSpan={5}>
                  <button
                    className="w-full hover:bg-gray-200 hover:text-gray-900 transition"
                    onClick={() => setIsCreating(true)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </th>
              )}
              {isCreating && (
                <>
                  <th>
                    <input
                      type="text"
                      className="bg-gray-200 w-40 text-gray-900 pl-0.5"
                      placeholder="Service Name"
                      value={newService.name}
                      onChange={(e) => {
                        setNewService((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }));
                      }}
                    />
                  </th>
                  <td>
                    <input
                      type="text"
                      className="bg-gray-200 w-20 text-gray-900 pl-0.5"
                      placeholder="Price"
                      value={newService.price}
                      onChange={(e) => {
                        setNewService((prev) => ({
                          ...prev,
                          price: Number(e.target.value),
                        }));
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="bg-gray-200 w-20 text-gray-900 pl-0.5"
                      placeholder="Duration"
                      value={newService.durationMinutes}
                      onChange={(e) => {
                        setNewService((prev) => ({
                          ...prev,
                          durationMinutes: Number(e.target.value),
                        }));
                      }}
                    />
                  </td>
                  <td>
                    <select
                      className="bg-gray-200 text-gray-900 h-6 pl-0.5"
                      onChange={(e) => {
                        setNewService((prev) => ({
                          ...prev,
                          isActive: e.target.value === 'Active',
                        }));
                      }}
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </td>
                  <td>
                    <div className="flex">
                      <button
                        className="hover:bg-gray-200 hover:text-gray-900 transition rounded-lg"
                        aria-label="Create Service"
                        onClick={() => {
                          if (business) {
                            handleAddService(business, newService);
                          }
                          setIsCreating(false);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-green-500"
                        />
                      </button>
                      <button
                        className="hover:bg-gray-200 hover:text-gray-900 transition rounded-lg"
                        aria-label="Create Service"
                        onClick={() => setIsCreating(false)}
                      >
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="text-red-500"
                          aria-label="Cancel Service Creation"
                        />
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          </tfoot>
        </table>
        <h3 className="mt-5 text-xl font-semibold pb-2">Appointments</h3>
        <ul className="flex flex-col gap-y-1">
          <li>Appointment 1</li>
          <li>Appointment 2</li>
        </ul>
      </div>
      <div className="flex mt-auto pt-10">
        <div className="mr-auto">
          <p>{business.phone && `${business.phone}`}</p>
        </div>
        <div className="ml-auto flex gap-x-1">
          <p>{business.address && `${business.address},`}</p>
          <p>{business.city && `${business.city}`}</p>
          <p>{business.country && `${business.country}`}</p>
        </div>
      </div>
    </section>
  );
}
