import React from "react";
import { TBookingResponse } from "../../../../interface/response.booking.interface";
import Swal from "sweetalert2";
import { useDeleteBookingMutation, usePatchBookingStatusMutation } from "../../../../redux/features/booking/booking.api";
import { useReturnVehicleMutation } from "../../../../redux/features/vehicle/vehicle.api";
import { TNotificationEmail } from "../../../../interface/email.emailjs.params.interface";
import { TFullUser } from "../../../../interface/user.interface";
import { TVehicleResponse } from "../../../../interface/response.vehicle.interface";
import sendEmail from "../../../../utils/sendEmail";
export interface TBookingCardProps {
    booking: TBookingResponse;
    setClickedItem: (id: TBookingResponse | null) => void;
};

const BookingCard: React.FC<TBookingCardProps> = ({ setClickedItem, booking }) => {
    const [patchBookingStatus] = usePatchBookingStatusMutation();
    const [returnVehicle] = useReturnVehicleMutation();
    const [deleteBooking] = useDeleteBookingMutation();

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

                        }).then(async (result) => {
                            if (result.isConfirmed) {
                                // DONE: email to customer for clear payment
                                const user: TFullUser = returnRes?.data?.data?.user;
                                const car: TVehicleResponse = returnRes?.data?.data?.car;
                                const due = returnRes?.data?.data?.totalCost;
                                const fullUrl = location.href;
                                const baseUrl = fullUrl.split('/').slice(0, 3).join('/')
                                const paymentUrl = baseUrl + `/user/booking/payout/${booking._id}`;

                                const EMAIL_PARAMS: TNotificationEmail = {
                                    name: user?.name,
                                    email: user?.email,
                                    subject: `Vehicle Return Confirmation & Payment Due for ${car?.name}`,
                                    description: `Thank you for returning the "${car.name}" to RentNGo. We hope you had a great experience.

                                    Please note that your total due for this rental is USD ${due}.
                                    Payment Link: ${paymentUrl}

                                    Kindly clear the outstanding payment at your earliest convenience. 
                                    If you have any questions or need assistance, feel free to contact us.`
                                }

                                const res = await sendEmail(2, EMAIL_PARAMS);
                                if (res?.status === 200) {
                                    Swal.fire({
                                        title: "Email Send",
                                        icon: "success"
                                    });
                                }
                                console.log(EMAIL_PARAMS);
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
                    if (action === 'cancel') {
                        // DONE: email to customer for notify cancelation
                        const EMAIL_PARAMS: TNotificationEmail = {
                            name: booking.user.name,
                            email: booking.user.email,
                            subject: `Booking Cancellation Notice for ${booking?.car?.name}`,
                            description: `We regret to inform you that your booking for the "${booking?.car?.name}" has been canceled. 
                            
                            If you have any questions or need assistance with a new booking, please feel free to contact us.   
                            We apologize for any inconvenience this may have caused and appreciate your understanding.`
                        };
                        await sendEmail(2, EMAIL_PARAMS);

                    } else {
                        // DONE: email to customer for notify approve booking
                        const EMAIL_PARAMS: TNotificationEmail = {
                            name: booking?.user?.name,
                            email: booking?.user?.email,
                            subject: `Booking Approved for ${booking?.car?.name} – Please Collect Your Vehicle`,
                            description: `We’re pleased to inform you that your booking for the "${booking?.car?.name}" has been approved.
                            
                            Please be aware that pricing starts from now, so we kindly request that you collect your vehicle as soon as possible to make the most of your rental period.
                            
                            If you have any questions or need assistance, feel free to contact us.`
                        };
                        await sendEmail(2, EMAIL_PARAMS);
                    }

                    // TEMP: delete after implementation emailjs
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
                const res = await deleteBooking({ _id: booking._id });

                if (res?.data?.success) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Booking has been deleted.",
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