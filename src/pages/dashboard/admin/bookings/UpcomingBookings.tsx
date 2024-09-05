import { useState } from "react";
import BookingCard from "../../../../components/dashboard/admin/bookings/BookingsCard";
import FetchErrorElmt from "../../../../components/error/FetchErrorElmt";
import LoadingSpinier from "../../../../components/global/LoadingSpinier";
import { useGetBookingForAdminQuery } from "../../../../redux/features/booking/booking.api";
import { TBookingResponse } from "../../../../interface/response.booking.interface";
import BookingDetails from "../../../../components/dashboard/admin/bookings/BookingDetails";
import NoDataErrorElmt from "../../../../components/error/NoDataErrorElmt";

const UpcomingBookings = () => {
    const { data, isLoading, isError } = useGetBookingForAdminQuery([{ status: 'pending' }]);
    const [clickedItem, setClickedItem] = useState<TBookingResponse | null>(null);

    if (isLoading) return <LoadingSpinier />;
    if (!data?.data.length && !isError) return <NoDataErrorElmt />;
    if (isError) return <FetchErrorElmt />
    if (clickedItem) {
        return <BookingDetails
            booking={clickedItem as TBookingResponse}
            setClickedItem={setClickedItem}
        />
    }

    return (
        <div data-aos='fade-left' className="">
            <h1 className="text-2xl font-semibold mb-5">Manage Pending Bookings</h1>
            <div className="flex flex-col w-full  mx-auto">
                {/* Column Headers */}
                <div className="flex bg-gray-200 text-gray-700 font-semibold">
                    <div className="flex-1 py-2 px-4">Vehicle</div>
                    <div className="flex-1 py-2 px-4">Date</div>
                    <div className="flex-1 py-2 px-4">Email</div>
                    <div className="flex-1 py-2 px-4">Address</div>
                    <div className="flex-1 py-2 px-4">Action</div>
                </div>
                {
                    data?.data?.map((booking: TBookingResponse, indx: number) => {
                        return <BookingCard key={indx} booking={booking} setClickedItem={setClickedItem} />
                    })
                }
            </div>
        </div>
    );
};

export default UpcomingBookings;