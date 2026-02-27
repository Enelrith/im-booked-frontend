import './App.css';
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import BusinessDashboard from './pages/BusinessDashboard';
import BusinessSidebar from './components/BusinessSidebar';
import CreateBusiness from './pages/CreateBusiness';
import ViewBusiness from './pages/ViewBusiness';

const Layout = () => {
  const location = useLocation();
  const hideNavbar = ['/login', '/register'].includes(location.pathname);
  const showSidebar = location.pathname.startsWith('/business');

  return (
    <div className="flex flex-col">
      {!hideNavbar && <Navbar />}
      <div className="flex flex-1">
        {showSidebar && <BusinessSidebar />}
        <main className="flex flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/business" element={<BusinessDashboard />} />
          <Route path="/business/create" element={<CreateBusiness />} />
          <Route path="/business/:id" element={<ViewBusiness />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
