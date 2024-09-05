import React from 'react';
import { TBookingCardProps } from '../../../../components/dashboard/admin/bookings/BookingsCard';
import { usePatchBookingStatusMutation } from '../../../../redux/features/booking/booking.api';
import Swal from 'sweetalert2';
import { TBookingResponse } from '../../../../interface/response.booking.interface';
import { TNotificationEmail } from '../../../../interface/email.emailjs.params.interface';
import sendEmail from '../../../../utils/sendEmail';
import { Link } from 'react-router-dom';

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
                    // DONE: email to user for booking cancelation notification
                    const EMAIL_PARAMS: TNotificationEmail = {
                        name: booking?.user?.name,
                        email: booking?.user?.email,
                        subject: `Booking Cancellation Confirmation for ${booking?.car?.name}`,
                        description: `This is to confirm that your booking for the "${booking?.car?.name}" has been successfully canceled. 
                        If you have any questions or need assistance with a new booking, please feel free to contact us.
                        
                        We apologize for any inconvenience this may have caused and appreciate your understanding.`
                    };
                    const emailSend = await sendEmail(2, EMAIL_PARAMS);
                    if (emailSend?.status === 200) {
                        Swal.fire({
                            title: "Canceled",
                            text: "Your order has been canceled.",
                            icon: "success"
                        });
                    }
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
                        <Link to={`${booking.totalCost > 0 ? `/user/booking/payout/${booking._id}` : '/dashboard/user/bookings/manage'}`}
                            className={`border px-1 rounded-md ${booking.totalCost > 0 ? 'bg-rose-600 hover:scale-105' : 'bg-gray-400 cursor-not-allowed'} text-white transition-all`}>Pay ${booking.totalCost}
                        </Link>}
                </div>
            </div>
        </div >
    );
};

export default BookingCard;