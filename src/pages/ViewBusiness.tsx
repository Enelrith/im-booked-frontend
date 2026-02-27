import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBusiness } from '../services/BusinessView';
import { Business, ErrorResponse } from '../types';

export default function ViewBusiness() {
  const [business, setBusiness] = useState<Business | null>(null);
  const [error, setError] = useState<ErrorResponse | null>(null);
  const params = useParams();
  const id = params.id ? params.id : '';

  useEffect(() => {
    const getBusinessResponse = async (id: string) => {
      const response = await getBusiness(id);

      if (response.status === 200) {
        setBusiness(response.data);
      } else {
        setError(response);
      }
    };

    getBusinessResponse(id);
  }, [id]);

  if (!business) return;
  return (
    <section className="bg-gray-700 ml-auto mr-auto mt-10 flex flex-col w-120 rounded-sm p-2 h-120">
      {error && (
        <p className="text-red-500">{`${error.message} (${error.status})`}</p>
      )}
      <h2 className="ml-auto mr-auto text-2xl font-semibold ">
        {`${business.name}`}
      </h2>
      <p className="mt-5">{`${business.description}`}</p>
      <div>
        <h3 className="mt-5 text-xl font-semibold pb-2">Appointments</h3>
        <ul className="flex flex-col gap-y-1">
          <li>Appointment 1</li>
          <li>Appointment 2</li>
        </ul>
      </div>
      <div className="flex mt-auto">
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
