import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from '../types/User'
import { BASE_URL } from '../utils/BASE'

const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getUser: builder.query<User, string>({
            query: (telegram_id: string) => `user/${telegram_id}`,
        }),
        validateTelegram: builder.mutation({
            query: (body) => ({
                url: '/validate',
                method: 'POST',
                body,
            }),
        }),
        registerUser: builder.mutation({
            query: (body) => ({
                url: '/user',
                method: 'POST',
                body,
            }),
        }),
        getProfilePhoto: builder.query({
            query: (telegram_id: string) => ({
                url: `https://functions.yandexcloud.net/d4eivi5nd7jsdoru9eit?telegram_user_id=${telegram_id}`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useGetUserQuery,
    useValidateTelegramMutation,
    useRegisterUserMutation,
    useGetProfilePhotoQuery,
} = api
export default api
