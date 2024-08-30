import React from "react";
import { TBookingResponse } from "../../../../interface/response.booking.interface";
import Swal from "sweetalert2";
import { usePatchBookingStatusMutation } from "../../../../redux/features/booking/booking.api";
import { useReturnVehicleMutation } from "../../../../redux/features/vehicle/vehicle.api";
export interface TBookingCardProps {
    booking: TBookingResponse;
    setClickedItem: (id: TBookingResponse | null) => void;
};

const BookingCard: React.FC<TBookingCardProps> = ({ setClickedItem, booking }) => {
    const [patchBookingStatus] = usePatchBookingStatusMutation();
    const [returnVehicle] = useReturnVehicleMutation();

    async function handleBookingStatus(action: 'approve' | 'cancel' | 'return') {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `${action === 'approve' ? 'Yes, approve it!' : action === 'return' ? 'Yes, Return it!' : 'Cancel this booking!'}`
        }).then(async (result) => {
            if (result.isConfirmed) {
                if (action === 'return') {
                    const hours = new Date().getHours().toString().padStart(2, '0');
                    const minutes = new Date().getMinutes().toString().padStart(2, '0');
                    const endTime = `${hours}:${minutes}`

                    const returnRes = await returnVehicle({
                        payload: {
                            bookingId: booking._id,
                            endTime
                        },
                    });

                    if (returnRes?.data?.success) {
                        Swal.fire({
                            title: `Total acceptable amount $${returnRes?.data?.data?.totalCost}`,
                            text: "Do you want to mail the payment link to customer?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: `Yes, email to ${returnRes?.data?.data?.user?.email}`

                        }).then((result) => {
                            if (result.isConfirmed) {
                                // ! email to customer for clear payment with payment link
                                // Swal.fire({
                                //     title: "Deleted!",
                                //     text: "Your file has been deleted.",
                                //     icon: "success"
                                // });
                            }
                        });
                    };
                    return;
                }

                const res = await patchBookingStatus({
                    _id: booking._id,
                    action: action === 'approve' ? 'ongoing' : 'canceled'
                });
                if (res?.data?.success) {
                    Swal.fire({
                        title: `${action === 'approve' ? 'Approved' : 'Canceled'}`,
                        text: `Order has been ${action === 'approve' ? 'Approved' : 'Canceled'}`,
                        icon: "success"
                    });
                }
            }
        });
    };

    async function handleDeleteCanceledBooking() {
        console.log(booking._id);
    }

    return (
        <div>
            <div className="flex">
                <div className="flex-1 py-2 px-4 border-b border-gray-300">{booking?.car?.name}</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300">{booking?.date}</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300">{booking?.user?.email}</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300">{booking.user?.address}</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300 space-x-2">

                    <button onClick={() => {
                        if (booking && setClickedItem) {
                            setClickedItem(booking)
                        }
                    }} className="border bg-gray-200 hover:bg-gray-300 transition-all hover:scale-105 px-1 rounded-md">View</button>

                    {booking.status !== 'canceled' && <button onClick={() => {
                        handleBookingStatus(booking?.status === 'pending' ? 'approve' : 'return');

                    }} className={`border px-1 ${booking?.status === 'pending' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-rose-600 hover:bg-rose-700 text-white'} rounded-md  transition-all hover:scale-105`}>{booking?.status === 'pending' ? 'Approve' : 'Return'}</button>}

                    {booking?.status === 'pending' && <button onClick={() => handleBookingStatus('cancel')} className="border bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-all hover:scale-105 px-1 ">Cancel</button>}

                    {booking?.status === 'canceled' && <button onClick={handleDeleteCanceledBooking} className="border bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-all hover:scale-105 px-1 ">Delete</button>}
                </div>
            </div>
        </div>
    );
};

export default BookingCard;