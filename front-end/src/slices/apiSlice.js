import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL, // ✅ Vite env variable
  credentials: 'include',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',   // optional, defaults to 'api'
  baseQuery,
  tagTypes: ['User'],   // you can add more tags like ['User', 'Exam', 'Result']
  endpoints: (builder) => ({}), // child APIs will be injected here
});
