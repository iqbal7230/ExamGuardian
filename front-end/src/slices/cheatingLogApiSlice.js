// cheatingLogApiSlice.js
import { apiSlice } from '../slices/apiSlice';
const CHEATING_LOGS_URL = '/api/users';
export const cheatingLogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCheatingLogs: builder.query({
      query: (examId) => ({
        url: `${CHEATING_LOGS_URL}/cheatingLogs/${examId}`,
        method: 'GET',
      }),
    }),
    saveCheatingLog: builder.mutation({
      query: (data) => ({
        url: `${CHEATING_LOGS_URL}/cheatingLogs`,
        method: 'POST',
        body: data,
      }),
    }),
    updateCheatingLog: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${CHEATING_LOGS_URL}/cheatingLogs/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCheatingLogsQuery,
  useSaveCheatingLogMutation,
  useUpdateCheatingLogMutation,
} = cheatingLogApiSlice;
