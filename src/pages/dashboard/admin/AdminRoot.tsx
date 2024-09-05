import { Link, Outlet } from "react-router-dom";
import Navbar from "../../../components/root/Navbar";
import { useState } from "react";
import { FaCarSide } from "react-icons/fa";
import { FaSwatchbook } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";

const AdminRoot = () => {
    const [openManageVehiclesMenus, setOpenManageVehiclesMenus] = useState(false);
    const [openManageOrdersMenus, setOpenManageOrdersMenus] = useState(false);
    const [openManageUsersMenus, setOpenManageUsersMenus] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState('/overview')

    return (
        <div className="">
            <div className="md:hidden min-h-screen w-full flex justify-center items-center">
                <p>Oops! Use computer for operating dashboard!</p>
            </div>
            <div className="hidden md:block">
                <div className="fixed w-full z-50">
                    <Navbar />
                </div>
                <div data-aos='fade-left' className="pt-[60px]">
                    <aside id="sidebar-multi-level-sidebar" className="fixed border-r left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
                            <ul className="space-y-2 font-medium">
                                <li className={selectedRoute === '/overview' ? 'bg-rose-600 rounded-md text-white' : undefined} onClick={() => {
                                    setSelectedRoute('/overview');
                                    setOpenManageOrdersMenus(false);
                                    setOpenManageUsersMenus(false);
                                    setOpenManageVehiclesMenus(false)
                                }}>
                                    <Link to={`/dashboard/admin/overview`} className="flex items-center p-2  rounded-lg ">
                                        <svg className="w-5 h-5 transition duration-75 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                        </svg>
                                        <span className="ms-3">Overview</span>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={() => {
                                        setOpenManageVehiclesMenus(!openManageVehiclesMenus);
                                        setOpenManageOrdersMenus(false);
                                        setOpenManageUsersMenus(false)
                                    }} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                        <FaCarSide size={22} />
                                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Manage Vehicles</span>
                                        <svg className={`size-3 ${openManageVehiclesMenus && 'rotate-180'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                        </svg>
                                    </button>
                                    <ul id="dropdown-example" className={`py-2 space-y-2 ${!openManageVehiclesMenus && 'hidden'}`}>
                                        <li className={selectedRoute === '/admin/vehicles/manage/view' ? 'bg-rose-600 rounded-md text-white' : undefined} onClick={() => setSelectedRoute('/admin/vehicles/manage/view')}>
                                            <Link to={'/dashboard/admin/vehicles/manage/view'} className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11  ">All Vehicles</Link>
                                        </li>
                                        <li className={selectedRoute === '/admin/vehicles/manage/new' ? 'bg-rose-600 rounded-md text-white' : undefined} onClick={() => setSelectedRoute('/admin/vehicles/manage/new')}>
                                            <Link to={'/dashboard/admin/vehicles/manage/new'} className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11">Add Vehicle</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <button onClick={() => {
                                        setOpenManageOrdersMenus(!openManageOrdersMenus);
                                        setOpenManageVehiclesMenus(false);
                                        setOpenManageUsersMenus(false);
                                    }} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                        <FaSwatchbook size={22} />
                                        <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Manage Bookings</span>
                                        <svg className={`size-3 ${openManageOrdersMenus && 'rotate-180'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                        </svg>
                                    </button>
                                    <ul id="dropdown-example" className={`py-2 space-y-2 ${!openManageOrdersMenus && 'hidden'}`}>
                                        <li className={selectedRoute === '/admin/bookings/manage/upcoming' ? 'bg-rose-600 rounded-md text-white' : undefined} onClick={() => setSelectedRoute('/admin/bookings/manage/upcoming')}>
                                            <Link to={'/dashboard/admin/bookings/manage/upcoming'} className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11">Upcoming Bookings</Link>
                                        </li>
                                        <li className={selectedRoute === '/admin/bookings/manage/ongoing' ? 'bg-rose-600 rounded-md text-white' : undefined} onClick={() => setSelectedRoute('/admin/bookings/manage/ongoing')}>
                                            <Link to={'/dashboard/admin/bookings/manage/ongoing'} className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11">Ongoing Bookings</Link>
                                        </li>
                                        {/* <li className={selectedRoute === '/admin/bookings/manage/success' ? 'bg-rose-600 rounded-md text-white' : undefined} onClick={() => setSelectedRoute('/admin/bookings/manage/success')}>
                                        <Link to={'/dashboard/admin/bookings/manage/success'} className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 ">Successful Bookings</Link>
                                    </li> */}
                                        <li className={selectedRoute === '/admin/bookings/manage/canceled' ? 'bg-rose-600 rounded-md text-white' : undefined} onClick={() => setSelectedRoute('/admin/bookings/manage/canceled')}>
                                            <Link to={'/dashboard/admin/bookings/manage/canceled'} className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11">Canceled Bookings</Link>
                                        </li>

                                    </ul>
                                    <li>
                                        <button onClick={() => {
                                            setOpenManageUsersMenus(!openManageUsersMenus);
                                            setOpenManageOrdersMenus(false);
                                            setOpenManageVehiclesMenus(false);
                                        }} type="button" className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                            <FaUsersCog size={22} />
                                            <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Manage Users</span>
                                            <svg className={`size-3 ${openManageUsersMenus && 'rotate-180'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                            </svg>
                                        </button>
                                        <ul id="dropdown-example" className={`py-2 space-y-2 ${!openManageUsersMenus && 'hidden'}`}>
                                            <li className={selectedRoute === '/admin/users/manage/customers' ? 'bg-rose-600 rounded-md text-white' : undefined} onClick={() => setSelectedRoute('/admin/users/manage/customers')}>
                                                <Link to={'/dashboard/admin/users/manage/customers'} className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 ">Customers</Link>
                                            </li>
                                            <li className={selectedRoute === '/admin/users/manage/admins' ? 'bg-rose-600 rounded-md text-white' : undefined} onClick={() => setSelectedRoute('/admin/users/manage/admins')}>
                                                <Link to={'/dashboard/admin/users/manage/admins'} className="flex items-center w-full p-2 transition duration-75 rounded-lg pl-11 ">Admins</Link>
                                            </li>
                                        </ul>
                                    </li>
                                </li>
                            </ul>
                        </div>
                    </aside>

                    <div className="p-4 sm:ml-64">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRoot;