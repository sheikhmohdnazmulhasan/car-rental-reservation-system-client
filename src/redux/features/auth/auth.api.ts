import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: ((builder) => ({
        createUser: builder.mutation({
            query: (data) => ({
                url: '/auth/signup',
                method: 'POST',
                body: data
            })
        })
    }))
})

export const { useCreateUserMutation } = authApi;