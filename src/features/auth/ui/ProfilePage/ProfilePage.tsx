import React from 'react'
import {useGetMeQuery} from '@/features/auth/api/authApi';
import {useFetchPlaylistsQuery} from '@/features/playlists/api/playlistsApi';
import {PlaylistList} from '@/features/playlists/ui/PlaylistsPage/PlaylistList/PlaylistList';
import {CreatePlaylistForm} from '@/features/playlists/ui/PlaylistsPage/CreatePlaylistForm/CreatePlaylistForm';
import s from './ProfilePage.module.css'
import {Navigate} from 'react-router';
import {Path} from '@/common/routing';

export const ProfilePage = () => {

    const { data: meResponse, isLoading: isMeLoading } = useGetMeQuery()

    const { data: playlistsResponse, isLoading } = useFetchPlaylistsQuery(
        { userId: meResponse?.userId },
        { skip: !meResponse?.userId }
    )

    if (isLoading || isMeLoading) return <p style={{fontSize: '26px', fontWeight: '700'}}>Skeleton is loading...</p>

    if (!isMeLoading && !meResponse) return <Navigate to={Path.Playlists} />

    return (
        <div>
            <h1>{meResponse?.login} page</h1>
            <div className={s.container}>
                <CreatePlaylistForm/>
                <PlaylistList playlists={playlistsResponse?.data || []} isPlaylistsLoading={isLoading || isMeLoading}/>
            </div>
        </div>
    )
}
