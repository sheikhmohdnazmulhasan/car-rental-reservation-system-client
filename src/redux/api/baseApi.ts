
import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include',

    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;
        if (token) return headers.set('authorization', `Bearer ${token}`);
        if (!token) return headers;
    }
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseQueryWithAdditionalFeatures: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions): Promise<any> => {
    const result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 400) {
        toast.error(result.error.data.message);
    }

    return result;
}

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithAdditionalFeatures,
    endpoints: () => ({})
})

