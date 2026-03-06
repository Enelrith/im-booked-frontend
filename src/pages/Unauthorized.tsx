import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

export default function Unauthorized() {
  return (
    <section className="flex flex-col items-center justify-center flex-1 gap-y-4 text-center px-6 mt-20">
      <div className="bg-gray-800 border border-gray-700 rounded-lg px-12 py-12 flex flex-col items-center gap-y-4 max-w-sm w-full">
        <div className="bg-red-500/10 border border-red-500/30 rounded-full w-14 h-14 flex items-center justify-center">
          <FontAwesomeIcon icon={faLock} className="text-red-400 text-xl" />
        </div>
        <div className="flex flex-col gap-y-1">
          <h2 className="text-gray-100 font-semibold text-3xl">
            Access Denied
          </h2>
          <p className="text-gray-400 text-sm">
            You need to be logged in to view this page.
          </p>
        </div>
        <div className="flex gap-x-3 mt-2">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors duration-150"
          >
            Log In
          </Link>
          <Link
            to="/"
            className="bg-gray-700 hover:bg-gray-600 text-gray-100 text-sm font-medium px-4 py-2 rounded-md border border-gray-600 transition-colors duration-150"
          >
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
