import React from 'react';
import { TBookingCardProps } from '../../../../components/dashboard/admin/bookings/BookingsCard';
import { usePatchBookingStatusMutation } from '../../../../redux/features/booking/booking.api';
import Swal from 'sweetalert2';
import { TBookingResponse } from '../../../../interface/response.booking.interface';

const BookingCard: React.FC<TBookingCardProps> = ({ booking, setClickedItem }) => {
    const [patchBookingStatus] = usePatchBookingStatusMutation();

    function handleCancelBooking() {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res: {
                    statusCode: number;
                    success: boolean;
                    message: string;
                    data: TBookingResponse
                } = await patchBookingStatus({ _id: booking._id, action: 'canceled' }).unwrap();

                if (res.success) {
                    // TODO: email to user for booking cancelation notification
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }

            }
        });

    }

    return (
        <div>
            <div className="flex">
                <div className="flex-1 py-2 px-4 border-b border-gray-300">{booking?.car?.name}</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300">{booking?.date}</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300">${booking?.car.pricePerHour}</div>
                <div className={`flex-1 py-2 px-4 border-b border-gray-300 
                ${booking.status === 'canceled' ? 'text-rose-600'
                        : booking.status === 'succeed' ? 'text-green-700'
                            : booking.status === 'ongoing' ? 'text-blue-500' : undefined}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300 space-x-2">

                    <button onClick={() => {
                        if (booking && setClickedItem) {
                            setClickedItem(booking)
                        }
                    }} className="border bg-gray-200 hover:bg-gray-300 transition-all hover:scale-105 px-1 rounded-md">View</button>

                    {booking.status === 'pending' &&
                        <button onClick={handleCancelBooking}
                            className={`border px-1 rounded-md  transition-all hover:scale-105`}>Cancel
                        </button>}

                    {booking.status === 'succeed' && booking.paymentStatus === 'unverified' &&
                        < button
                            className={`border px-1 rounded-md bg-rose-600 text-white transition-all hover:scale-105`}>Pay ${booking.totalCost}
                        </button>}
                </div>
            </div>
        </div >
    );
};

export default BookingCard;