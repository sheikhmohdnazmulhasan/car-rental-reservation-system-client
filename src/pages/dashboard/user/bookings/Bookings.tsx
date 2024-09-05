
import { MouseEvent, useState } from "react";
import { TBookingResponse } from "../../../../interface/response.booking.interface";
import { useGetUserSpecificBookingsQuery } from "../../../../redux/features/booking/booking.api";
import BookingCard from "./BookingCard";
import LoadingSpinier from "../../../../components/global/LoadingSpinier";
import NoDataErrorElmt from "../../../../components/error/NoDataErrorElmt";
import BookingDetails from "../../../../components/dashboard/admin/bookings/BookingDetails";
import FetchErrorElmt from "../../../../components/error/FetchErrorElmt";

const Bookings = () => {
    const [filter, setFilter] = useState<{ status: string } | null>(null)
    const [clickedItem, setClickedItem] = useState<TBookingResponse | null>(null);
    const { data, isLoading, isError } = useGetUserSpecificBookingsQuery<{
        data: {
            data: TBookingResponse[]
        };
        isLoading: boolean;
        isError: boolean;
    }>(filter ? [filter] : []);

    if (isLoading) return <LoadingSpinier />;
    // if (!data?.data.length && !isError) return <NoDataErrorElmt />;
    if (isError) return <FetchErrorElmt />

    if (clickedItem) {
        return <BookingDetails
            booking={clickedItem as TBookingResponse}
            setClickedItem={setClickedItem}
        />
    }

    return (
        <div data-aos='fade-left' className="">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold mb-5">Manage Your Bookings</h1>
                <div className="">
                    <select onClick={(event: MouseEvent<HTMLSelectElement>) => {
                        const selectedStatus = (event.target as HTMLFormElement).value;
                        if (selectedStatus) {
                            setFilter({ status: selectedStatus });
                        }
                    }} name="" id="" className="bg-gray-200 px-2 py-1">
                        <option disabled selected value="">Filter</option>
                        <option value="succeed">Succeed</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="pending">Pending</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
            </div>
            {!data?.data?.length && !isError ? <NoDataErrorElmt /> : (
                <div className="flex flex-col w-full  mx-auto">
                    {/* Column Headers */}
                    <div className="flex bg-gray-200 text-gray-700 font-semibold">
                        <div className="flex-1 py-2 px-4">Vehicle</div>
                        <div className="flex-1 py-2 px-4">Date</div>
                        <div className="flex-1 py-2 px-4">Price PH</div>
                        <div className="flex-1 py-2 px-4">Status</div>
                        <div className="flex-1 py-2 px-4">Action</div>
                    </div>
                    {
                        data?.data?.map((booking: TBookingResponse, indx: number) => {
                            return <BookingCard key={indx} booking={booking} setClickedItem={setClickedItem} />
                        })
                    }
                </div>
            )}
        </div>
    );
};

export default Bookings;