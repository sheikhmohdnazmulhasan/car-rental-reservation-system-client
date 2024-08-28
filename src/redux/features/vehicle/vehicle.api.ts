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

        deleteVehicle: builder.mutation({
            query: (args) => ({
                url: `cars/${args?.vehicle_Id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['vehicle']
        })
    })
})

export const {
    useCreateVehicleMutation,
    useGetVehiclesQuery,
    useDeleteVehicleMutation
} = vehicleApi