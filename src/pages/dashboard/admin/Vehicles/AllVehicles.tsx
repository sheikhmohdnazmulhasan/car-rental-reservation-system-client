import FetchErrorElmt from "../../../../components/error/FetchErrorElmt";
import LoadingSpinier from "../../../../components/global/LoadingSpinier";
import { useGetVehiclesQuery } from "../../../../redux/features/vehicle/vehicle.api";

const AllVehicles = () => {
    const { data, isLoading, isError } = useGetVehiclesQuery(undefined);

    if (isLoading) return <LoadingSpinier />
    if (isError) return <FetchErrorElmt />

    console.log(data);

    return (
        <div>
            all car
        </div>
    );
};

export default AllVehicles;