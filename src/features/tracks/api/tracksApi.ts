import {baseApi} from '@/app/api/baseApi';
import {FetchTracksResponse} from '@/features/tracks/api/tracksApi.types';
import {withZodCatch} from '@/common/utils';
import {fetchTracksResponseSchema} from '@/features/tracks/model/tracks.schemas';

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
            ...withZodCatch(fetchTracksResponseSchema),
        }),

    }),
})

export const {useFetchTracksInfiniteQuery} = tracksApi;
