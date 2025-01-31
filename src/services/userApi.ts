import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface User {
  id: string
  username: string
  email: string
}

type UsersResponse = User[]

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/api' }),
  tagTypes: ['Users'],
  endpoints: (build) => ({
    getUsers: build.query<UsersResponse, void>({
      query: () => 'users',
      providesTags: (result) => {
        return Array.isArray(result)
          ? [...result.map(({ id }) => ({ type: 'Users', id }) as const), { type: 'Users', id: 'LIST' }]
          : [{ type: 'Users', id: 'LIST' }];
      }
    }),
    getUser: build.query<User, string>({
      query: (id) => `users/${id}`,
      providesTags: (_, __, id) => [{ type: 'Users', id }],
    }),
    addUser: build.mutation<User, Partial<User>>({
      query(body) {
        return {
          url: 'users',
          method: 'POST',
          body,
        }
      },
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: build.mutation<User, Partial<User>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `users/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: (_, __, { id }) => [{ type: 'Users', id }],
    }),
    deleteUser: build.mutation<{ success: boolean; id: string }, string>({
      query(id) {
        return {
          url: `users/${id}`,
          method: 'DELETE',
        }
      },
      invalidatesTags: (_, __, id) => [{ type: 'Users', id }],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi
