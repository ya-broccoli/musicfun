import {
    CreatePlaylistArgs, FetchPlaylistsArgs,
    PlaylistData,
    PlaylistsResponse,
    UpdatePlaylistArgs
} from '@/features/playlists/api/playlistsApi.types';
import {baseApi} from '@/app/api/baseApi';
import {Images} from '@/common/types';

export const playlistsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
            query: (params) => ({
                url: 'playlists', params
            }),
            providesTags: ['Playlist'],
        }),
        createPlaylist: build.mutation<{ data: PlaylistData }, CreatePlaylistArgs>({
            query: (body) => ({method: 'post', url: 'playlists', body}),
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
