
import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include'
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseQueryWithAdditionalFeatures: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions): Promise<any> => {
    const result = await baseQuery(args, api, extraOptions);

    return result;
}

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithAdditionalFeatures,
    endpoints: () => ({})
})

