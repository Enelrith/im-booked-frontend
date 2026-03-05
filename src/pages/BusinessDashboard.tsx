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
    <section className="ml-auto mr-auto mt-10 flex flex-col w-250 gap-y-6 pb-10">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-100">My Businesses</h2>
          <Link
            to="/business/create"
            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-colors duration-150"
          >
            + New Business
          </Link>
        </div>

        {businesses.length === 0 && !error ? (
          <div className="px-6 py-12 text-center text-gray-500 text-sm">
            No businesses yet.
            <Link
              to="/business/create"
              className="text-blue-400 hover:text-blue-300"
            >
              Create your first one.
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800 text-gray-400 uppercase text-xs tracking-wider border-b border-gray-700">
                <th scope="col" className="px-6 py-3 text-left font-medium">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left font-medium">
                  Description
                </th>
                <th scope="col" className="px-6 py-3 text-left font-medium">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left font-medium" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {businesses.map((business) => (
                <tr
                  key={business.id}
                  className="hover:bg-gray-700/30 transition-colors duration-150"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-100 text-left whitespace-nowrap"
                    title={business.name}
                  >
                    {business.name}
                  </th>
                  <td
                    className="px-6 py-4 text-gray-400 max-w-xs truncate"
                    title={business.description ?? 'No Description'}
                  >
                    {business.description ?? (
                      <span className="italic text-gray-600">
                        No description
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        business.isActive
                          ? 'bg-green-500/15 text-green-400 border border-green-500/30'
                          : 'bg-red-500/15 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {business.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/business/${business.id}`}
                      className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors duration-150"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}
