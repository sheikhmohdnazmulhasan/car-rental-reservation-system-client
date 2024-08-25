import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const [dropDownState, setDropDownState] = useState(false);

    return (
        <nav className="flex border-b items-center justify-between text-[#393E46] px-4 py-2 bg-white">
            <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-xl font-semibold  transition-all duration-200 hover:scale-110">
                <h2 >Rent<span className='text-rose-600'>NGo—</span></h2>
            </div>
            <ul className="hidden items-center justify-between gap-10 md:flex">
                <NavLink to={'/'}>
                    <li className="group flex  cursor-pointer flex-col">
                        Home<span className="mt-[2px] h-[3px] w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                </NavLink>
                <NavLink to={'/about'}>
                    <li className="group flex  cursor-pointer flex-col">
                        About<span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                </NavLink>
                <NavLink to={'/contact'}>
                    <li className="group flex  cursor-pointer flex-col">
                        Contact<span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                </NavLink>
                <li className="group flex  cursor-pointer flex-col">
                    Contact<span className="mt-[2px] h-[3px]  w-[0px] rounded-full bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                </li>
            </ul>
            <div onClick={() => setDropDownState(!dropDownState)} className="relative flex transition-transform md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="cursor-pointer" > <line x1="4" x2="20" y1="12" y2="12" /> <line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /> </svg>
                {dropDownState && (
                    <ul className=" z-10  gap-2 border  text-[#393E46]  absolute right-0 top-11 flex w-[200px] flex-col  rounded-lg   text-base ">
                        <NavLink to={'/'}>
                            <li className="cursor-pointer  px-6 py-2 rounded-t-lg">
                                Home
                            </li>
                        </NavLink>
                        <NavLink to={'/about'}>
                            <li className="cursor-pointer  px-6 py-2 ">
                                About
                            </li>
                        </NavLink>
                        <NavLink to={'/contact'}>
                            <li className="cursor-pointer  px-6 py-2">
                                Contact
                            </li>
                        </NavLink>
                        <li className="cursor-pointer  px-6 py-2 ">
                            Contact
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar

