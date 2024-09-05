import React from 'react';
import { Link } from 'react-router-dom';
import { useGetVehiclesQuery } from '../../redux/features/vehicle/vehicle.api';
import { TVehicleResponse } from '../../interface/response.vehicle.interface';

const HotRides: React.FC = () => {
    const { data } = useGetVehiclesQuery(undefined)

    return (
        <div data-aos='fade-up' className='flex md:flex-row flex-col-reverse  md:justify-center md:items-center'>
            <div className="md:flex ">
                {data?.data?.slice(4, 7)?.reverse()?.map((vehicle: TVehicleResponse, indx: number) => {
                    return (
                        <Link to={`/vehicles/details/${vehicle?._id}`}>
                            <div key={indx} className="w-full md:w-72 hover:scale-105 transition-all">
                                <div className="flex items-center justify-center">
                                    <div className="max-w-sm w-full sm:w-full lg:w-full py-6 px-3">
                                        <div className="bg-white shadow-xl rounded-md overflow-hidden">
                                            <div className="bg-cover bg-center h-56 p-4"
                                                style={{ backgroundImage: `url(${vehicle?.photo})` }}>
                                            </div>
                                            <div className="p-4">
                                                <p className="uppercase tracking-wide text-sm font-bold text-gray-700">{vehicle?.name} • {vehicle?.color}</p>
                                                <p className="text-gray-700">{vehicle?.location}</p>
                                                <p className='text-gray-700'><span className='text-rose-600 font-semibold text-3xl'>${vehicle?.pricePerHour}</span>/Hour</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div >
                        </Link>
                    )
                })}
            </div>
            {/* text */}
            <div className="px-5">
                <h1 className='text-3xl font-bold text-gray-900'>Explore Our Collection of Hot Rides That Define Style</h1>
                <p className='mt-4 md:block hidden text-gray-700'>Dive into our sizzling collection of vehicles, each handpicked for their bold style, unmatched performance, and undeniable presence on the road. Whether you’re looking to cruise the city streets or take on the open highway, our fleet offers the perfect blend of power, luxury, and innovation. Get ready to turn heads and experience driving like never before with our hottest rides, designed to make every journey as thrilling as the destination.</p>

                <p className='mt-4 md:hidden text-gray-700'>Dive into our sizzling collection of vehicles, each handpicked for their bold style, unmatched performance, and undeniable presence on the road. </p>
            </div>
        </div >
    );
};

export default HotRides;