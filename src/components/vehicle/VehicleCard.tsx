import React from 'react';
import { TVehicleResponse } from '../../interface/response.vehicle.interface';
import { Link } from 'react-router-dom';

const VehicleCard: React.FC<TVehicleResponse> = ({ _id, status, name, color, description, location, pricePerHour, photo }) => {
    return (
        <Link to={`/vehicles/details/${_id}`}>
            <div className="hover:scale-105 transition-all">
                <blockquote
                    className="flex h-full flex-col justify-between bg-white shadow-sm"
                >
                    <div className="relative border flex flex-col md:flex-row bg-white ">

                        < div className="bg-gray-200 absolute right-2 ring-0 top-2 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block" >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </ div>

                        <div className="w-full md:w-[50%] bg-white grid place-items-center">
                            <img src={photo} className="w-full h-full object-cover " />
                        </div>
                        <div className="w-full md:w-[50%] bg-white flex flex-col space-y-2 p-6">

                            <h3 className="font-semibold text-gray-800 text-xl mt-1">{name} {color}</h3>
                            {/* 100 */}
                            <p className='md:block hidden'>{description.slice(0, 100)}...</p>
                            {/* 50 */}
                            <p className='md:hidden'>{description.slice(0, 50)}</p>
                            <div className="flex justify-between item-center">
                                <p className="text-gray-500 font-medium hidden md:block"> <strong>Location:</strong> {location}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="">
                                    <p className="text-xl font-black text-rose-600">
                                        ${pricePerHour}
                                        <span className="font-normal text-gray-600 text-base">/Hour</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </blockquote>
            </div>
        </Link>
    );
};

export default VehicleCard;