import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TVehicleResponse } from "../../../../interface/response.vehicle.interface";
import { useDeleteVehicleMutation } from "../../../../redux/features/vehicle/vehicle.api";
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";

const VehicleCard: React.FC<TVehicleResponse> = ({ _id, name, status, description, pricePerHour, location, photo }) => {
    const [deleteVehicle] = useDeleteVehicleMutation();

    const handleDeleteVehicle = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    const res = await deleteVehicle({ id: _id });
                    if (res?.data?.success) {
                        Swal.fire({
                            title: "Deleted!",
                            text: `${name} has been deleted.`,
                            icon: "success"
                        });
                    }

                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        icon: "error",
                        title: "Something went wrong!",
                        text: "An unexpected error occurred."
                    });
                }
            }
        });
    }

    return (
        <div className="relative flex flex-row border bg-white">

            < div className="bg-gray-200 absolute right-2 ring-0 top-2 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block" >
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </ div>

            <div className="w-1/3 bg-white grid place-items-center">
                <img src={photo} alt={name} className="w-full h-full object-cover " />
            </div>
            <div className="w-2/3 bg-white flex flex-col space-y-2 p-6">
                <h3 className="font-semibold text-gray-800 text-xl mt-1">{name}</h3>
                <p>{description.slice(0, 40)}...</p>
                <div className="flex justify-between item-center">
                    <p className="text-gray-500 font-medium hidden md:block"> <strong>Location:</strong> {location} </p>
                </div>
                <div className="flex justify-between items-center">
                    <div className="">
                        <p className="text-xl font-black text-gray-800">
                            ${pricePerHour}
                            <span className="font-normal text-gray-600 text-base">/Hour</span>
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link to={`/dashboard/admin/vehicles/manage/edit/${_id}`}><FaEdit className="hover:scale-105 transition-all cursor-pointer" /></Link>
                        <FaTrash onClick={handleDeleteVehicle} color="red" className="hover:scale-105 transition-all cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;