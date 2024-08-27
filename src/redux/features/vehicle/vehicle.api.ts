import { baseApi } from "../../api/baseApi";

const vehicleApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createVehicle: builder.mutation({
            query: (arg) => ({
                url: '/cars',
                method: 'POST',
                body: arg.payload
            })
        }),
    })
})

export const { useCreateVehicleMutation } = vehicleApi