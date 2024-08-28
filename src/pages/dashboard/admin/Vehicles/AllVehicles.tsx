import VehicleCard from "../../../../components/dashboard/admin/vehicles/VehicleCard";
import FetchErrorElmt from "../../../../components/error/FetchErrorElmt";
import LoadingSpinier from "../../../../components/global/LoadingSpinier";
import { TVehicleResponse } from "../../../../interface/response.vehicle.interface";
import { useGetVehiclesQuery } from "../../../../redux/features/vehicle/vehicle.api";

const AllVehicles = () => {
    const { data, isLoading, isError } = useGetVehiclesQuery(undefined);

    if (isLoading) return <LoadingSpinier />
    if (isError) return <FetchErrorElmt />

    return (
        <div className="">
            <h1 className="text-2xl font-semibold mb-5">Manage Rentable Vehicles</h1>
            <div className="grid grid-cols-2 gap-5">
                {data?.data?.slice()?.reverse().map((vehicle: TVehicleResponse, indx: number) => {
                    return <VehicleCard key={indx} {...vehicle} />
                })}
            </div>
        </div>
    );
};

export default AllVehicles;