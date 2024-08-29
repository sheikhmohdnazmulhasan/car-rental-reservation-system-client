import BookingCard from "../../../../components/dashboard/admin/bookings/BookingsCard";
import FetchErrorElmt from "../../../../components/error/FetchErrorElmt";
import LoadingSpinier from "../../../../components/global/LoadingSpinier";
import { useGetBookingForAdminQuery } from "../../../../redux/features/booking/booking.api";

const UpcomingBookings = () => {
    const { data, isLoading, isError } = useGetBookingForAdminQuery([{ status: 'pending' }]);
    console.log(data);

    // if (isLoading) return <LoadingSpinier />;
    // if (isError) return <FetchErrorElmt />

    return (
        <div className="">
            <h1 className="text-2xl font-semibold mb-5">Manage Pending Bookings</h1>
            <div className="flex flex-col w-full  mx-auto">
                {/* Column Headers */}
                <div className="flex bg-gray-200 text-gray-700 font-semibold">
                    <div className="flex-1 py-2 px-4">Vehicle</div>
                    <div className="flex-1 py-2 px-4">Date</div>
                    <div className="flex-1 py-2 px-4">Email</div>
                    <div className="flex-1 py-2 px-4">Location</div>
                    <div className="flex-1 py-2 px-4">Action</div>
                </div>
                <BookingCard />
            </div>
        </div>
    );
};

export default UpcomingBookings;