import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 h-15 w-full flex items-center pl-5 pr-5">
      <Link to={'/'}>
        <h2 className="text-2xl mt-auto mb-auto pl-5 font-semibold text-gray-100 justify-center">
          I'm Booked
        </h2>
      </Link>
      <Link to={'/business'} className="ml-auto">
        Business
      </Link>
    </nav>
  );
}
