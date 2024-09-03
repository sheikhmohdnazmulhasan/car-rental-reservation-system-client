import { Link, Outlet } from "react-router-dom";
import Navbar from "../../../components/root/Navbar";
import { useState } from "react";
import { FaSwatchbook } from "react-icons/fa";

const UserRoot = () => {
    const [selectedRoute, setSelectedRoute] = useState('/overview');

    return (
        <div className="">
            <div className="fixed w-full z-50">
                <Navbar />
            </div>
            <div className="pt-[60px]">
                <aside id="sidebar-multi-level-sidebar" className="fixed border-r left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
                        <ul className="space-y-2 font-medium">
                            <li className={selectedRoute === '/overview' ? 'bg-rose-600 rounded-md text-white' : undefined} onClick={() => {
                                setSelectedRoute('/overview');
                            }}>
                                <Link to={`/dashboard/user/overview`} className="flex items-center p-2  rounded-lg ">
                                    <svg className="w-5 h-5 transition duration-75 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                    </svg>
                                    <span className="ms-3">Overview</span>
                                </Link>
                            </li>

                            <li onClick={() => {
                                setSelectedRoute('/bookings')
                            }} className={selectedRoute === '/bookings' ? 'bg-rose-600 rounded-md text-white' : undefined}>
                                <Link to={'/dashboard/user/bookings/manage'} className="flex items-center w-full p-2 text-base  transition duration-75 rounded-lg group " aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                    <FaSwatchbook size={22} />
                                    <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">Manage Bookings</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div className="p-4 sm:ml-64">
                    <Outlet />
                </div>
            </div >
        </div >
    );
};

export default UserRoot;