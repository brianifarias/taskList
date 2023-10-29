import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Task'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => '/tasks',
      providesTags: ['Task'],
    }),
    getCategories: builder.query({
      query: () => '/categories',
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        url: '/tasks',
        method: 'POST',
        body: newTask,
      }),
      invalidatesTags: ['Task'],
    }),
    updateTask: builder.mutation({
      query: (updateTask) => ({
        url: `/tasks/${updateTask.id}`,
        method: 'PUT',
        body: updateTask,
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const { useGetTasksQuery, useGetCategoriesQuery, useCreateTaskMutation, useUpdateTaskMutation } = apiSlice;
