import { Link } from 'react-router-dom';

export default function BusinessSidebar() {
  return (
    <aside className="w-1/6">
      <div className="bg-gray-800 h-[calc(100vh-3.75rem)] border-t border-gray-900 flex flex-col overflow-x-hidden">
        <h2 className="mt-2 font-semibold text-lg border-b border-gray-500 w-50 ml-auto mr-auto text-center">
          Business Dashboard
        </h2>
        <ul className="pl-5 mt-3">
          <li>
            <Link to={'/business/create'}>
              <span className="text-gray-100 font-semibold hover:text-gray-300">
                Create Business
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
