import { useGetBookingForAdminQuery } from "../../../../redux/features/booking/booking.api";

const UpcomingBookings = () => {
    const { } = useGetBookingForAdminQuery([{ status: }])
    return (
        <div>
            upcomig book
        </div>
    );
};

export default UpcomingBookings;