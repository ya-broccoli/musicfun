import {baseApi} from '@/app/api/baseApi';
import {FetchTracksResponse} from '@/features/tracks/api/tracksApi.types';

export const tracksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // 3 TS generics: page contents, queryArg, pageParam
        fetchTracks: build.infiniteQuery<FetchTracksResponse, void, string | null>({
            infiniteQueryOptions: {
                initialPageParam: null,
                getNextPageParam: lastPage => {
                    return lastPage.meta.nextCursor || null
                },
            },
            query: ({pageParam}) => ({
                    url: '/playlists/tracks',
                    params: {
                        cursor: pageParam,
                        paginationType: 'cursor',
                        pageSize: 5
                    }
                }
            ),
        }),

    }),
})

export const {useFetchTracksInfiniteQuery} = tracksApi;