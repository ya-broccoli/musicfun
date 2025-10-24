import {baseApi} from '@/app/api/baseApi';
import {MeResponse} from '@/features/auth/api/authApi.types';

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getMe: build.query<MeResponse, void>({
            query: () => ({url: '/auth/me'}),
        }),

    }),
})

export const { useGetMeQuery } = authApi;