import {CreatePlaylistArgs, FetchPlaylistsArgs, UpdatePlaylistArgs} from '@/features/playlists/api/playlistsApi.types';
import {baseApi} from '@/app/api/baseApi';
import {Images} from '@/common/types';
import {playlistCreateResponseSchema, playlistsResponseSchema} from '@/features/playlists/model/playlists.schemas';
import {imagesSchema} from '@/common/schemas';
import {withZodCatch} from '@/common/utils';

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // когда у нас есть схема, можно не указывать тип ответа для query или mutation
        fetchPlaylists: build.query({
            query: (params: FetchPlaylistsArgs) => ({
                url: 'playlists', params
            }),
            // responseSchema: playlistsResponseSchema,
            // catchSchemaFailure: (err) => {
            //     errorToast('Zod error. Details in the console', err.issues)
            //     return {
            //         status: 'CUSTOM_ERROR',
            //         error: 'SchemaValidation failed',
            //     }
            // },
            ...withZodCatch(playlistsResponseSchema),
            // skipSchemaValidation: process.env.NODE_ENV === 'production',
            providesTags: ['Playlist'],
        }),
        createPlaylist: build.mutation({
            query: (body: CreatePlaylistArgs) => ({method: 'post', url: 'playlists', body}),
            ...withZodCatch(playlistCreateResponseSchema),
            invalidatesTags: ['Playlist'],
        }),
        deletePlaylist: build.mutation<void, string>({
            query: (playlistId) => ({method: 'delete', url: `playlists/${playlistId}`}),
            invalidatesTags: ['Playlist'],
        }),
        updatePlaylist: build.mutation<void, { playlistId: string, body: UpdatePlaylistArgs }>({
            query: ({playlistId, body}) => {
                // console.log('4')
                return {method: 'put', url: `playlists/${playlistId}`, body}
            },
            onQueryStarted: async ({playlistId, body}, {queryFulfilled, dispatch, getState}) => {
                // console.log('1')
                const args = playlistsApi.util.selectCachedArgsForQuery(getState(), 'fetchPlaylists')

                const patchCollection: any[] = []

                args.forEach( arg => {
                    patchCollection.push(
                        dispatch(
                            playlistsApi.util.updateQueryData(
                                'fetchPlaylists',
                                {
                                    pageNumber: arg.pageNumber,
                                    pageSize: arg.pageSize,
                                    search: arg.search,
                                },
                                (state) => {
                                    // console.log('2')  // изменение нашего стейта в кэше
                                    // console.log(state) // это обертка от ImmerJs, какой-то Proxy(Object)
                                    // console.log(current(state)) // так можно достучаться до нашего стейта
                                    const index = state.data.findIndex(playlist => playlist.id === playlistId)
                                    if (index !== -1) {
                                        // логика для изменения стейта
                                        state.data[index].attributes = {...state.data[index].attributes, ...body}
                                    }
                                }
                            ),
                        )
                    )
                })
                // const patchCollection = dispatch(
                //     playlistsApi.util.updateQueryData(
                //         'fetchPlaylists',
                //         {
                //             pageNumber: 1,
                //             pageSize: 2,
                //             search: ''
                //         },
                //         (state) => {
                //             console.log('2')  // изменение нашего стейта в кэше
                //             // console.log(state) // это обертка от ImmerJs, какой-то Proxy(Object)
                //             // console.log(current(state)) // так можно достучаться до нашего стейта
                //             const index = state.data.findIndex(playlist => playlist.id === playlistId)
                //             if (index !== -1) {
                //                 // логика для изменения стейта
                //                 state.data[index].attributes = {...state.data[index].attributes, ...body}
                //             }
                //         }
                //     ),
                // )
                try {
                    // console.log('3')
                    await queryFulfilled
                    // console.log('5 success')
                } catch (err) {
                    patchCollection.forEach((patchCollection) => {
                        patchCollection.undo()
                    })
                    // patchCollection.undo()
                    // console.log('6 error')
                }
            },
            invalidatesTags: ['Playlist'],
        }),
        uploadPlaylistCover: build.mutation<Images, { playlistId: string, file: File }>({
            query: ({playlistId, file}) => {
                const formData = new FormData();
                formData.append('file', file);

                return ({method: 'post', url: `playlists/${playlistId}/images/main`, body: formData})
            },
            ...withZodCatch(imagesSchema),
            invalidatesTags: ['Playlist'],
        }),
        deletePlaylistCover: build.mutation<void, string>({
            query: (playlistId) => ({method: 'delete', url: `playlists/${playlistId}/images/main`}),
            invalidatesTags: ['Playlist'],
        }),
    }),
})

export const {
    useFetchPlaylistsQuery,
    useCreatePlaylistMutation,
    useDeletePlaylistMutation,
    useUpdatePlaylistMutation,
    useUploadPlaylistCoverMutation,
    useDeletePlaylistCoverMutation,
} = playlistsApi;
