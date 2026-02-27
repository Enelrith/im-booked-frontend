import { getBusinessThumbnails } from '../services/BusinessThumbnails';
import { BusinessThumbnail } from '../types';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function BusinessDashboard() {
  const [businesses, setBusinesses] = useState<BusinessThumbnail[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      const response = await getBusinessThumbnails();

      if (response?.status === 200) {
        setBusinesses(response.data);
      } else {
        setError(`An error has occurred (${response?.status})`);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <section className="w-full flex">
      <div className="mt-5 flex flex-col w-full">
        <h2 className="text-2xl font-semibold text-gray-100 ml-auto mr-auto">
          Business Management
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <ul className="flex flex-wrap gap-x-20 gap-y-20 p-5 justify-evenly">
          {businesses.map((business) => (
            <li
              key={business.id}
              className="bg-gray-800 p-2 rounded-sm w-80 h-50 flex flex-col"
            >
              <Link
                to={`/business/${business.id}`}
                className="flex flex-col h-full"
              >
                <h2 className="text-2xl text-center font-semibold truncate">
                  {business.name}
                </h2>
                <p className="text-lg mt-2 line-clamp-3">
                  {business.description}
                </p>
                <p
                  className={
                    (business.isActive ? 'text-green-500 ' : 'text-red-500 ') +
                    'text-right bg-gray-600/50 w-fit mt-auto ml-auto p-1 rounded-xl'
                  }
                >
                  {business.isActive ? 'Active' : 'Inactive'}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
