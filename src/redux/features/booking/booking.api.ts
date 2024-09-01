import { TQueryParams } from "../../../interface/redux.args.params";
import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBookingForAdmin: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append(Object.keys(item)[0] as string, Object.values(item)[0] as string)
                    });
                };

                return {
                    url: '/bookings',
                    method: 'GET',
                    params,
                };
            },
            providesTags: ['booking']
        }),

        createNewBooking: builder.mutation({
            query: (args) => ({
                url: '/bookings',
                method: 'POST',
                body: args.payload,
            }),
            invalidatesTags: ['booking', 'vehicle']
        }),

        patchBookingStatus: builder.mutation({
            query: (args: { _id: string; action: string; }) => {
                const params = new URLSearchParams;
                params.append('action', args.action);

                return {
                    url: `/bookings/action/status/${args._id}`,
                    method: 'PATCH',
                    params,
                }
            },
            invalidatesTags: ['booking', 'vehicle']
        }),

        deleteBooking: builder.mutation({
            query: (args: { _id: string; }) => {
                const params = new URLSearchParams;
                params.append('_id', args._id);

                return {
                    url: `/bookings/delete`,
                    method: 'DELETE',
                    params,
                }
            },
            invalidatesTags: ['booking', 'vehicle']
        })
    })
});

export const {
    useGetBookingForAdminQuery,
    usePatchBookingStatusMutation,
    useCreateNewBookingMutation,
    useDeleteBookingMutation
} = bookingApi;