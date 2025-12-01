import React, {useState} from 'react'
import {useFetchPlaylistsQuery} from '@/features/playlists/api/playlistsApi'
import s from './PlaylistsPage.module.css'
import {CreatePlaylistForm} from '@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm';
import {useDebounceValue} from '@/common/hooks';
import {Pagination} from '@/common/components';
import {PlaylistList} from '@/features/playlists/ui/PlaylistsPage/PlaylistList/PlaylistList';

export const PlaylistsPage = () => {

    const [search, setSearch] = useState('')

    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(2)

    const debounceSearch = useDebounceValue(search)
    const { data, isLoading } = useFetchPlaylistsQuery({
            search: debounceSearch,
            pageNumber: currentPage,
            pageSize,
        },
        //     {
        //     pollingInterval: 3000,
        //     skipPollingIfUnfocused: true
        // }
    )

    // if (error) {
    //     if('status' in error) {
    //         // FetchBaseQueryError
    //         const errMessage = 'error' in error
    //             ? error.error
    //             : (error.data as {error: string}).error || (error.data as {message: string}).message || 'Some error occurred'
    //         toast(errMessage, {type: 'error', theme: 'colored'})
    //     } else {
    //         // SerializedError
    //         const errMessage = error.message || 'Some error occurred'
    //         toast(errMessage, {type: 'error', theme: 'colored'})
    //     }
    // }

    const changePageSizeHandler = (size: number) => {
        setPageSize(size)
        setCurrentPage(1)
    }

    const onChangeSearchHandler = (value: string) => {
        setCurrentPage(1)
        setSearch(value)
    }

    if (isLoading) return <p style={{fontSize: '26px', fontWeight: '700'}}>Skeleton is loading...</p>

    return (
        <div className={s.container}>
            <h1>Playlists page</h1>
            <input
                type="search"
                placeholder="Search playlist by title"
                onChange={(e) => onChangeSearchHandler(e.currentTarget.value)}
            />
            <PlaylistList playlists={data?.data || []} isPlaylistsLoading={isLoading}/>
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagesCount={data?.meta.pagesCount || 1}
                pageSize={pageSize}
                changePageSize={changePageSizeHandler}
            />
        </div>
    )
}
