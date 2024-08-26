import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../pages/root/Home";
import About from "../pages/root/About";
import Contact from "../pages/root/Contact";
import Login from "../pages/root/Login";
import Register from "../pages/root/Register";
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
export const router = createBrowserRouter([
  {
    path: "/",

    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/profile/settings', element: <ProfileSettings /> },

      // admin (protected)
      {
        path: '/dashboard/admin',
        element: <AdminRoot />,
        children: [
          { path: '/dashboard/admin/overview', element: <AdminOverview /> },
          { path: '/dashboard/admin/vehicles/manage/view', element: <AllVehicles /> },
          { path: '/dashboard/admin/vehicles/manage/new', element: <AddVehicle /> },
          { path: '/dashboard/admin/bookings/manage/upcoming', element: <UpcomingBookings /> },
          { path: '/dashboard/admin/bookings/manage/ongoing', element: <OngoingBookings /> },
          { path: '/dashboard/admin/bookings/manage/success', element: <SuccessfulBookings /> },
          { path: '/dashboard/admin/bookings/manage/canceled', element: <CanceledBookings /> },
          { path: '/dashboard/admin/users/manage/admins', element: <Admins /> },
          { path: '/dashboard/admin/users/manage/customers', element: <Customers /> },
        ]
      }
    ]
  },
]);