import React from 'react';
import { TBookingCardProps } from '../../../../components/dashboard/admin/bookings/BookingsCard';

const BookingCard: React.FC<TBookingCardProps> = ({ booking, setClickedItem }) => {
    return (
        <div>
            <div className="flex">
                <div className="flex-1 py-2 px-4 border-b border-gray-300">{booking?.car?.name}</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300">{booking?.date}</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300">${booking?.car.pricePerHour}</div>
                <div className={`flex-1 py-2 px-4 border-b border-gray-300 
                ${booking.status === 'canceled' ? 'text-rose-600'
                        : booking.status === 'succeed' ? 'text-green-700'
                            : booking.status === 'ongoing' ? 'text-blue-500' : 'text-white'}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300 space-x-2">

                    <button onClick={() => {
                        if (booking && setClickedItem) {
                            setClickedItem(booking)
                        }
                    }} className="border bg-gray-200 hover:bg-gray-300 transition-all hover:scale-105 px-1 rounded-md">View</button>

                    {booking.status === 'pending' &&
                        <button
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