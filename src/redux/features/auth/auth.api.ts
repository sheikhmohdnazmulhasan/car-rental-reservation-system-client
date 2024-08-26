import { TQueryParams } from "../../../interface/redux.args.params";
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

        getFullUser: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParams) => {
                        params.append((Object.keys(item)[0] as string), (Object.values(item)[0] as string));
                    });
                };

                return {
                    url: `auth/user`,
                    method: 'GET',
                    params
                }
            }
        })
    }))
})

export const { useCreateUserMutation, useLoginUserMutation, useGetFullUserQuery } = authApi;