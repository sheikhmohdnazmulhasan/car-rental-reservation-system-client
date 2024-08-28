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

        createVehicle: builder.mutation({
            query: (arg) => ({
                url: '/cars',
                method: 'POST',
                body: arg.payload
            }),
            invalidatesTags: ['vehicle']
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
            invalidatesTags: ['vehicle']
        })
    })
})

export const {
    useCreateVehicleMutation,
    useGetVehiclesQuery,
    usePatchVehicleMutation,
    useDeleteVehicleMutation
} = vehicleApi