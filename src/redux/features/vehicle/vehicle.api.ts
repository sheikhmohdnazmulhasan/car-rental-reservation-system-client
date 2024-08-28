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
    })
})

export const { useCreateVehicleMutation, useGetVehiclesQuery } = vehicleApi