import { TBookingResponse } from "../../../interface/response.booking.interface";
import { useGetUserSpecificBookingsQuery } from "../../../redux/features/booking/booking.api";

const Bookings = () => {
    const { data, isLoading } = useGetUserSpecificBookingsQuery<{
        data: TBookingResponse;
        isLoading: boolean;
        // isError: //what is the error type
    }>([
        { status: 'pending' }
    ]);
    return (
        <div>
            my booking
        </div>
    );
};

export default Bookings;