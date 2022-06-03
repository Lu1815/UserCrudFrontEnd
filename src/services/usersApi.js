import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = 'http://localhost:5000'

export const usersApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ['Api'],
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'api/users/',
            providesTags: ['Api']
        }),
        addUser: builder.mutation({
            query: (body) => {
                return {
                    url: 'api/users/add',
                    method: 'POST',
                    body: body,
                    headers: {
                        'Content-type': 'application/json'
                    },
                }
            },
        }),
        updateUser: builder.mutation({
            query: (userId, ...body) => {
                return {
                    url: `api/users/update/${userId}`,
                    method: 'PUT',
                    body: body,
                    headers: {
                        'Content-type': 'application/json'
                    },
                }
            },
            invalidatesTags: ['Api']
        }),
        deleteUser: builder.mutation({
            query: (id) => {
                return {
                    url: `api/users/delete/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['Api']
        })
    })
});

export const {
    useGetUsersQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApi;