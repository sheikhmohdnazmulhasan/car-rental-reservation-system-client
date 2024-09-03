import { baseApi } from "../../api/baseApi";

const statisticsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        statistics: builder.query({
            query: (args: { role: string }) => {
                return {
                    url: `statistics/${args.role}`,
                    method: 'GET'
                }
            },
            providesTags: ['statistics']
        })
    })
})

export const { useStatisticsQuery } = statisticsApi;