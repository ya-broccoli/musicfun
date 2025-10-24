import * as React from 'react';
import s from '@/features/playlists/ui/PlaylistsPage.module.css';
import {EditPlaylistForm} from '@/features/playlists/ui/PlaylistsPage/EditPlaylistForm/EditPlaylistForm';
import {PlaylistItem} from '@/features/playlists/ui/PlaylistsPage/PlaylistItem/PlaylistItem';
import {PlaylistData, UpdatePlaylistArgs} from '@/features/playlists/api/playlistsApi.types';
import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {useDeletePlaylistMutation} from '@/features/playlists/api/playlistsApi';

type Props = {
    playlists: PlaylistData[]
    isPlaylistsLoading: boolean
}

export const PlaylistList = ({ playlists, isPlaylistsLoading }: Props) => {

    const [playlistId, setPlaylistId] = useState<string | null>(null)
    const {register, handleSubmit, reset} = useForm<UpdatePlaylistArgs>()

    const [deletePlaylist] = useDeletePlaylistMutation()

    const deletePlaylistHandler = (playlistId: string) => {
        if (confirm('Are you sure you want to delete the playlist?')) {
            deletePlaylist(playlistId)
        }
    }

    const editPlaylistHandler = (playlist: PlaylistData | null) => {
        if (playlist) {
            setPlaylistId(playlist.id)
            reset({
                title: playlist.attributes.title,
                description: playlist.attributes.description,
                tagIds: playlist.attributes.tags.map(t => t.id),
            })
        } else {
            setPlaylistId(null)
        }
    }

    return (
        <div className={s.items}>
            {!playlists.length && !isPlaylistsLoading && <h2>Playlists not found</h2>}
            {playlists.map(playlist => {

                const isEditing = playlist.id === playlistId

                return (
                    <div className={s.item}>
                        {
                            isEditing
                                ? <EditPlaylistForm
                                    playlist={playlist}
                                    register={register}
                                    handleSubmit={handleSubmit}
                                    editPlaylist={editPlaylistHandler}
                                    setPlaylistId={setPlaylistId}
                                />
                                : <PlaylistItem
                                    playlist={playlist}
                                    deletePlaylist={deletePlaylistHandler}
                                    editPlaylist={editPlaylistHandler}
                                />
                        }
                    </div>
                )
            })}
        </div>
    );
};