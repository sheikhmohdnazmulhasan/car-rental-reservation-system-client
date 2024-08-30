import React from "react";
import { TBookingResponse } from "../../../../interface/response.booking.interface";

const BookingCard: React.FC<TBookingResponse> = ({ setClickedItem, _id }) => {
    const currentStatus = 'pending';

    return (
        <div>
            <div className="flex">
                <div className="flex-1 py-2 px-4 border-b border-gray-300">Nazmzm</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300">1-20323-2</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300">akakakaak</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300">Lokksns snsn</div>
                <div className="flex-1 py-2 px-4 border-b border-gray-300 space-x-2">
                    <button onClick={() => {
                        if (_id && setClickedItem) {
                            setClickedItem(_id)
                        }
                    }} className="border bg-gray-200 hover:bg-gray-300 transition-all hover:scale-105 px-1 rounded-md">View</button>

                    <button className={`border px-1 ${currentStatus === 'pending' ? 'bg-gray-200 hover:bg-gray-300' : 'bg-rose-600 hover:bg-rose-700 text-white'} rounded-md  transition-all hover:scale-105`}>{currentStatus === 'pending' ? 'Approve' : 'Return'}</button>

                    {currentStatus === 'pending' && <button className="border bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-all hover:scale-105 px-1 ">Cenacle</button>}
                </div>
            </div>
        </div>
    );
};

export default BookingCard;