import { baseApi } from "../../api/baseApi";

const vehicleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getVehicles: builder.query({
            query: () => ({
                url: '/cars',
                method: 'GET',
            }),
            providesTags: ['vehicle']
        }),

        getSingleVehicle: builder.query({
            query: (args: { _id: string }) => ({
                url: `cars/${args._id}`,
                method: 'GET',
            }),
            providesTags: ['vehicle']
        }),

        createVehicle: builder.mutation({
            query: (arg) => ({
                url: '/cars',
                method: 'POST',
                body: arg.payload
            }),
            invalidatesTags: ['vehicle', 'statistics']
        }),

        patchVehicle: builder.mutation({
            query: (args) => ({
                url: `/cars/${args?._id}`,
                method: 'PUT',
                body: args.payload,
            }),
            invalidatesTags: ['vehicle']
        }),

        deleteVehicle: builder.mutation({
            query: (args) => ({
                url: `/cars/${args?.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['vehicle', 'statistics']
        }),

        returnVehicle: builder.mutation({
            query: (args: { payload: { bookingId: string; endTime: string } }) => ({
                url: `/cars/return`,
                method: 'PUT',
                body: args.payload
            }),
            invalidatesTags: ['vehicle', 'booking', 'statistics']
        })
    })
})

export const {
    useCreateVehicleMutation,
    useGetVehiclesQuery,
    useGetSingleVehicleQuery,
    usePatchVehicleMutation,
    useReturnVehicleMutation,
    useDeleteVehicleMutation
} = vehicleApi