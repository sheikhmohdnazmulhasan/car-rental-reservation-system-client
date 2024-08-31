import { Link } from "react-router-dom";
import { TVehicleResponse } from "../../interface/response.vehicle.interface";
import { useGetVehiclesQuery } from "../../redux/features/vehicle/vehicle.api";

const Cta = () => {
    const { data } = useGetVehiclesQuery(undefined);
    const randomNumber: number = Math.floor(Math.random() * data?.data?.length);
    return (

        <div className="relative flex items-center overflow-hidden ">
            <div className="container relative flex px-6 py-10 mx-auto">
                <div className="relative flex flex-col sm:w-2/3 lg:w-2/5">
                    <span className="w-20 h-2 mb-12 bg-gray-800">
                    </span>
                    <h1 className="flex flex-col text-6xl font-black leading-none text-gray-800 uppercase font-bebas-neue sm:text-8xl">
                        Be on
                        <span className="text-5xl sm:text-7xl text-rose-600">
                            Time
                        </span>
                    </h1>
                    <p className="text-sm text-gray-700 sm:text-base mt-3">
                        At <strong>RentNGo—</strong>, we understand that every trip is unique. That's why we help you find the perfect car to suit your needs. Whether you’re looking for comfort, fuel efficiency, or a rugged vehicle for an adventure, we’ve got you covered.
                    </p>
                    <div className="flex mt-8">
                        <Link to={`/vehicles/details/${(data?.data?.[randomNumber] as TVehicleResponse)?._id}`} className="px-4 py-2 mr-4 text-white uppercase bg-rose-600 border-2 border-transparent rounded-md text-md hover:bg-rose-700">
                            Book Now
                        </Link>
                    </div>
                </div>
                <div className="relative hidden sm:block sm:w-1/3 lg:w-3/5 p-5 rounded-md">
                    <img src={(data?.data[randomNumber] as TVehicleResponse)?.photo} className="rounded-md" />
                </div>
            </div>
        </div>
    );
};

export default Cta;