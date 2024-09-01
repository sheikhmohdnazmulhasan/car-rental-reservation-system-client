import { useParams } from "react-router-dom";
import { useGetSingleVehicleQuery, useGetVehiclesQuery } from "../../redux/features/vehicle/vehicle.api";
import FetchErrorElmt from "../../components/error/FetchErrorElmt";
import LoadingSpinier from "../../components/global/LoadingSpinier";
import ReactImageMagnify from 'react-image-magnify';
import Footer from "../../components/root/Footer";
import { TVehicleResponse } from "../../interface/response.vehicle.interface";
import Navbar from "../../components/root/Navbar";
import VehicleCard from "../../components/vehicle/VehicleCard";

const VehicleDetails = () => {
    const { _id } = useParams<{ _id: string }>();

    const { data: item, isError: singleError, isLoading: singleLoading } = useGetSingleVehicleQuery<{
        data: {
            data: TVehicleResponse
        };
        isLoading: boolean;
        isError: boolean;
    }>({ _id: _id as string });

    const { data } = useGetVehiclesQuery<{
        data: {
            data: TVehicleResponse[]
        }
    }>(undefined);

    const moreItemExceptThisOne: TVehicleResponse[] = data?.data?.filter((data: { _id: string; }) => data._id !== item?.data?._id);
    const randomIndex = Math.floor(Math.random() * moreItemExceptThisOne?.length);

    console.log();

    if (singleLoading) return <LoadingSpinier />;
    if (singleError) return <FetchErrorElmt />;

    return (
        <div className="font-sans bg-white">
            <Navbar />
            <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
                <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6 rounded-lg">
                    <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                        <div className="rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                            <ReactImageMagnify
                                {...{
                                    smallImage: {
                                        alt: 'Product',
                                        isFluidWidth: true,
                                        src: item?.data?.photo,
                                    },
                                    largeImage: {
                                        src: item?.data?.photo,
                                        width: 1200,
                                        height: 1800,
                                    },
                                    enlargedImageContainerStyle: { background: '#fff', zIndex: 9 },
                                    enlargedImageStyle: { objectFit: 'cover' },
                                }}
                            />
                        </div>
                        <div className="text-left mt-5 hidden md:block">{item?.data?.description}</div>
                    </div>

                    <div className="lg:col-span-2">
                        <h2 className="text-2xl font-extrabold text-gray-800">{item?.data?.name} {item?.data?.color}</h2>
                        <p className="">{item?.data?.description.slice(1, 200)}...</p>

                        {/* rating */}
                        <div className="flex space-x-2 mt-4">
                            <svg className="w-5 fill-rose-600" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg className="w-5 fill-rose-600" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg className="w-5 fill-rose-600" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg className="w-5 fill-rose-600" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <svg className="w-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                            </svg>
                            <h4 className="text-gray-800 text-base">{item?.data?.pricePerHour - 100} Reviews</h4>
                        </div>

                        <div className="mt-5">
                            <h1 className="font-semibold">Location: {item?.data?.location}, Bangladesh</h1>
                            <h1 className="font-semibold">Fuel Type: {item?.data?.fuelType}</h1>
                            <div className="flex gap-1 mt-2">
                                <p className="font-semibold">Features:</p>
                                <div className=" flex items-center gap-2 flex-wrap">
                                    {
                                        item?.data?.features?.map((feature: string, indx: number) => {
                                            return <span key={indx} className="bg-gray-200 text-sm rounded-sm px-2">{feature}</span>
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <p className=""><span className="text-gray-800 text-3xl font-bold">${item?.data?.pricePerHour}</span> /Hour</p>
                        </div>

                        {item?.data?.status ? (
                            <div className="flex flex-wrap gap-4 mt-8">

                                <button type="button" className="w-full  px-4 py-2.5 border bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded">Book Now</button>
                            </div>
                        ) : (
                            <button type="button" className="w-full mt-20 px-4 py-2.5 border border-rose-600 bg-transparent hover:bg-gray-50 text-rose-800 text-sm font-semibold cursor-not-allowed rounded">Vehicle Unavailable</button>
                        )}
                    </div>
                </div>
            </div>

            {moreItemExceptThisOne?.length && (
                <div className="mx-5 md:mx-10 lg:mx-16 py-20">
                    <h1 className="text-4xl font-semibold">Browse More Similar Vehicles</h1>
                    <div className="grid grid-cols-1 mt-10 md:grid-cols-2 gap-5">
                        {moreItemExceptThisOne?.slice(randomIndex, randomIndex + 2).map((item: TVehicleResponse, indx: number) => (
                            <VehicleCard key={indx} {...item} />
                        ))}
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default VehicleDetails;