import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: ((builder) => ({
        createUser: builder.mutation({
            query: (data) => ({
                url: '/auth/signup',
                method: 'POST',
                body: data
            })
        }),

        loginUser: builder.mutation({
            query: (credential) => ({
                url: '/auth/signin',
                method: 'POST',
                body: credential
            })
        }),


    }))
})

export const { useCreateUserMutation, useLoginUserMutation } = authApi;