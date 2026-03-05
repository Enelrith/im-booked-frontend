import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faCalendar,
  faClipboardList,
} from '@fortawesome/free-solid-svg-icons';

const features = [
  {
    icon: <FontAwesomeIcon icon={faBriefcase} />,
    title: 'Manage Your Businesses',
    description:
      'Create and organise multiple businesses from a single account. Keep your services and schedules separated.',
  },
  {
    icon: <FontAwesomeIcon icon={faClipboardList} />,
    title: 'Add Your Services',
    description:
      'Add the services you offer with custom pricing, duration, and availability status.',
  },
  {
    icon: <FontAwesomeIcon icon={faCalendar} />,
    title: 'Track Appointments',
    description:
      'Log appointments, assign them to services, and track their status.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ml-auto mr-auto">
      <section className="flex flex-col items-center justify-center text-center px-6 pt-28 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full opacity-10"
            style={{
              background:
                'radial-gradient(circle, #2563eb 0%, transparent 70%)',
            }}
          />
        </div>

        <span className="text-xs uppercase tracking-widest text-blue-400 font-medium mb-4 border border-blue-500/30 bg-blue-500/10 px-3 py-1 rounded-full">
          Appointment Management
        </span>

        <h1 className="text-5xl font-bold text-gray-100 leading-tight max-w-2xl mb-5">
          Your schedule, <span className="text-blue-400">organised.</span>
        </h1>

        <p className="text-gray-400 text-lg max-w-xl mb-10 leading-relaxed">
          I'm Booked is a lightweight tool for small business owners to manage
          their services and appointments easily.
        </p>

        <div className="flex gap-x-4">
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors duration-150"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-gray-800 hover:bg-gray-700 text-gray-100 text-sm font-medium px-5 py-2.5 rounded-md border border-gray-700 hover:border-gray-600 transition-colors duration-150"
          >
            Log In
          </Link>
        </div>
      </section>

      <section className="ml-auto mr-auto w-full max-w-4xl px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col gap-y-3 hover:border-gray-600 transition-colors duration-150"
            >
              <span className="text-2xl">{feature.icon}</span>
              <h3 className="text-gray-100 font-semibold text-sm">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="ml-auto mr-auto w-full max-w-4xl px-6 pb-24">
        <div className="bg-gray-800 border border-gray-700 rounded-lg px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-y-6">
          <div className="flex flex-col gap-y-1">
            <h2 className="text-gray-100 font-semibold text-lg">
              Ready to get organised?
            </h2>
            <p className="text-gray-400 text-sm">
              Create an account and set up your first business in minutes.
            </p>
          </div>
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-md transition-colors duration-150 whitespace-nowrap"
          >
            Create a Free Account
          </Link>
        </div>
      </section>
    </div>
  );
}
