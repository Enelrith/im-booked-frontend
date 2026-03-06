import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logoutUser } from '../services/Logout';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const email = localStorage.getItem('email');

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, []);

  const handleLogout = async () => {
    const response = await logoutUser();

    if (response.status === 204) {
      localStorage.removeItem('email');
      window.location.href = '/login';
    } else {
      alert('An error has occurred during logout');
    }
  };

  return (
    <nav className="bg-gray-800 h-15 w-full flex items-center px-10 border-b border-gray-700">
      <Link to="/">
        <h2 className="text-xl font-semibold text-gray-100">I'm Booked</h2>
      </Link>

      <div className="flex items-center gap-x-6 ml-auto">
        {email && (
          <Link
            to="/business"
            className="text-sm text-gray-400 hover:text-gray-100 transition-colors duration-150"
          >
            Business
          </Link>
        )}

        {email ? (
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-x-2 text-sm text-gray-400 hover:text-gray-100 transition-colors duration-150"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <FontAwesomeIcon icon={faUser} size="sm" />
              <span>{email}</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                size="xs"
                className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <div
              className={`absolute right-0 mt-3 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg overflow-hidden z-50 transition-all duration-150 ${
                isOpen
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-1 pointer-events-none'
              }`}
            >
              <div className="px-4 py-2.5 border-b border-gray-700">
                <p className="text-xs text-gray-500 truncate">{email}</p>
              </div>
              <button
                className="w-full px-4 py-2.5 text-sm text-red-400 hover:bg-gray-700 text-left transition-colors duration-150"
                onClick={() => handleLogout()}
              >
                Log out
              </button>
            </div>
          </div>
        ) : (
          <div>
            <Link to={'/login'}>Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
