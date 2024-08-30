import React from "react";
import { TBookingCardProps } from "./BookingsCard";

const BookingDetails: React.FC<TBookingCardProps> = ({ booking, setClickedItem }) => {
    return <div className="">

        {/* head */}
        <h3 className="text-xl font-semibold">Product Info</h3>
        <p className="mb-5">1202-323</p>
        <div className="flex w-full bg-gray-100 p-3 rounded-md font-semibold">
            <div className="w-[60%] ">Images And Name </div>
            <div className="w-[20%]">Quantity</div>
            <div className="w-[20%]">Price</div>
        </div>

        {/* Vehicle */}
        < div className="flex w-full p-3 mt-5 rounded-md border-b shadow-sm ">
            <div className="w-[60%] flex items-center gap-2 ">
                <img className="size-20 rounded-md" src='' alt="" />
                <p>title</p>
            </div>
            {/* quantity */}
            <div className="w-[20%] mt-4">4343434</div>

            {/* price */}
            <div className="w-[20%] mt-4">$-</div>
        </div>

        {/* customer info */}
        <div className="mt-10 flex justify-between">
            <div className="">
                <h3 className="text-xl font-semibold mb-5">Customer Info</h3>
                <div className="mt-5">
                    <p><strong>Name: </strong>sheikh</p>
                    <p><strong>Email: </strong>nazmul@outlook.com</p>
                    <p><strong>Phone: </strong>0101010</p>
                    <p><strong>Address: </strong>kurigram</p>
                </div>
            </div>
            <div className="">
                <h3 className="text-xl font-semibold mb-5">Extra Features</h3>
                <div className="mt-5">

                </div>
            </div>
        </div>

        {/* close */}
        <div className="flex justify-end mt-10">
            <button onClick={() => setClickedItem(null)} className="text-white bg-rose-600 py-1 rounded-sm px-4">Close</button>
        </div>

    </div >
};

export default BookingDetails;