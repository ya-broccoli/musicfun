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
    const [pageSize, setPageSize] = useState(8)

    const debounceSearch = useDebounceValue(search)
    const {data, isLoading} = useFetchPlaylistsQuery({
        search: debounceSearch,
        pageNumber: currentPage,
        pageSize,
    },
    //     {
    //     pollingInterval: 3000,
    //     skipPollingIfUnfocused: true
    // }
    )

    const changePageSizeHandler = (size: number) => {
        setPageSize(size)
        setCurrentPage(1)
    }

    const onChangeSearchHandler = (value: string) => {
        setCurrentPage(1)
        setSearch(value)
    }

    return (
        <div className={s.container}>
            <h1>Playlists page</h1>
            <CreatePlaylistForm/>
            <input
                type="search"
                placeholder="Search playlist by title"
                onChange={(e) => onChangeSearchHandler(e.currentTarget.value)}
            />
            <PlaylistList playlists={data?.data || []} isPlaylistsLoading={isLoading} />
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
