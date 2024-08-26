import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Home from "../pages/root/Home";
import About from "../pages/root/About";
import Contact from "../pages/root/Contact";
import Login from "../pages/root/Login";
import Register from "../pages/root/Register";
import AdminRoot from "../pages/admin/AdminRoot";
import AdminOverview from "../pages/admin/AdminOverview";
import AddVehicle from "../pages/admin/Vehicles/AddVehicle";
import AllVehicles from "../pages/admin/Vehicles/AllVehicles";
import AllBookings from "../pages/admin/bookings/AllBookings";
import Return from "../pages/admin/bookings/Return";
import AllUsers from "../pages/admin/users/AllUsers";
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

      // admin (protected)
      {
        path: '/dashboard/admin',
        element: <AdminRoot />,
        children: [
          { path: '/dashboard/admin/overview', element: <AdminOverview /> },
          { path: '/dashboard/admin/vehicles/manage/view', element: <AllVehicles /> },
          { path: '/dashboard/admin/vehicles/manage/new', element: <AddVehicle /> },
          { path: '/dashboard/admin/bookings/manage/view', element: <AllBookings /> },
          { path: '/dashboard/admin/bookings/manage/return', element: <Return /> },
          { path: '/dashboard/admin/users/manage/view', element: <AllUsers /> },
        ]
      }
    ]
  },
]);