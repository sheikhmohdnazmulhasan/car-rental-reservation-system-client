import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../pages/root/Home";
import About from "../pages/root/About";
import Contact from "../pages/root/Contact";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminRoot from "../pages/dashboard/admin/AdminRoot";
import AdminOverview from "../pages/dashboard/admin/AdminOverview";
import AllVehicles from "../pages/dashboard/admin/Vehicles/AllVehicles";
import AddVehicle from "../pages/dashboard/admin/Vehicles/AddVehicle";
import SuccessfulBookings from "../pages/dashboard/admin/bookings/SuccessfulBookings";
import CanceledBookings from "../pages/dashboard/admin/bookings/CanceledBookings";
import UpcomingBookings from "../pages/dashboard/admin/bookings/UpcomingBookings";
import OngoingBookings from "../pages/dashboard/admin/bookings/OngoingBookings";
import Admins from "../pages/dashboard/admin/users/Admins";
import Customers from "../pages/dashboard/admin/users/Customers";
import ProfileSettings from "../pages/profile/ProfileSettings";
import EditVehicle from "../pages/dashboard/admin/Vehicles/edit/EditVehicle";
import Recover from "../pages/auth/Recover";
import Vehicles from "../pages/root/Vehicles";
export const router = createBrowserRouter([
  {
    path: "/",

    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/vehicles', element: <Vehicles /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/recover', element: <Recover /> },
      { path: '/profile/settings', element: <ProfileSettings /> },

      // admin (protected)
      {
        path: '/dashboard/admin',
        element: <AdminRoot />,
        children: [
          { path: 'overview', element: <AdminOverview /> },
          { path: 'vehicles/manage/view', element: <AllVehicles /> },
          { path: 'vehicles/manage/new', element: <AddVehicle /> },
          { path: 'vehicles/manage/edit/:_id', element: <EditVehicle /> },
          { path: 'bookings/manage/upcoming', element: <UpcomingBookings /> },
          { path: 'bookings/manage/ongoing', element: <OngoingBookings /> },
          { path: 'bookings/manage/success', element: <SuccessfulBookings /> },
          { path: 'bookings/manage/canceled', element: <CanceledBookings /> },
          { path: 'users/manage/admins', element: <Admins /> },
          { path: 'users/manage/customers', element: <Customers /> },
        ]
      }
    ]
  },
]);