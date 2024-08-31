import { useParams } from "react-router-dom";
import Navbar from "../../components/root/Navbar";
import Footer from "../../components/root/Footer";
import { useGetSingleVehicleQuery } from "../../redux/features/vehicle/vehicle.api";

const VehicleDetails = () => {
    const { _id } = useParams();
    const { data, isLoading, isError } = useGetSingleVehicleQuery({ _id: _id as string });

    console.log({ data, isLoading, isError });
    return (
        <div>
            <Navbar />
            <div className="h-screen">
                {data?.data?.name}
            </div>
            <Footer />
        </div>
    );
};

export default VehicleDetails;