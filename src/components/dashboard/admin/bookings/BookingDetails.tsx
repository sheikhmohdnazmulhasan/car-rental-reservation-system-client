import React from "react";
import { TBookingCardProps } from "./BookingsCard";
{/* date, statTime,  status*/ }

const BookingDetails: React.FC<TBookingCardProps> = ({ booking, setClickedItem }) => {

    return <div data-aos='zoom-out' className="">
        {/* head */}
        <h3 className="text-xl font-semibold">Booking Details</h3>
        <p className="mb-5">{booking?.date}</p>
        <div className="flex w-full bg-gray-100 p-3 rounded-md font-semibold">
            <div className="w-[60%] ">Images And Name </div>
            <div className="w-[20%]">Location</div>
            <div className="w-[20%]">Price Per Hour</div>
        </div>

        {/* Vehicle */}
        < div className="flex w-full p-3 mt-5 rounded-md border-b shadow-sm ">
            <div className="w-[60%] flex items-center gap-2 ">
                <img className="size-20 rounded-md" src={booking?.car?.photo} alt="" />
                <p>{booking?.car?.name} {booking?.car?.fuelType} {booking?.car?.color}</p>
            </div>
            {/* location */}
            <div className="w-[20%] mt-4">{booking?.car?.location}</div>

            {/* price */}
            <div className="w-[20%] mt-4">${booking?.car?.pricePerHour}</div>
        </div>

        {/* customer info */}
        <div className="mt-10 flex justify-between">
            <div className="">
                <h3 className="text-xl font-semibold mb-5">Customer Info</h3>
                <div className="mt-5">
                    <p><strong>Name: </strong>{booking?.user?.name}</p>
                    <p><strong>Email: </strong>{booking?.user?.email}</p>
                    <p><strong>Phone: </strong>{booking?.user?.phone}</p>
                    <p><strong>Address: </strong>{booking?.user?.address}</p>
                </div>
            </div>
            {/* <div className="">
                <h3 className="text-xl font-semibold mb-5">Extra Features</h3>
                <div className="mt-5">
                    {booking?.additionalInfo?.extraFeatures.map((feature) => (
                        <span>{feature},&nbsp;</span>
                    ))}
                </div>
            </div> */}
        </div>

        {/* close */}
        <div className="flex justify-end mt-10">
            <button onClick={() => setClickedItem(null)} className="text-white bg-rose-600 py-1 rounded-sm px-4">Close</button>
        </div>

    </div >
};

export default BookingDetails;