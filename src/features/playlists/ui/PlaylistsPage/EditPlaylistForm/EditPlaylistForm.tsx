import * as React from 'react';
import {SubmitHandler, useForm, UseFormHandleSubmit, UseFormRegister} from 'react-hook-form';
import {PlaylistData, UpdatePlaylistArgs} from '@/features/playlists/api/playlistsApi.types';
import {useUpdatePlaylistMutation} from '@/features/playlists/api/playlistsApi';

type Props = {
    playlist: PlaylistData
    register: UseFormRegister<UpdatePlaylistArgs>
    handleSubmit: UseFormHandleSubmit<UpdatePlaylistArgs>
    editPlaylist: (playlist: null) => void
    setPlaylistId: (playlistId: null) => void
}

export const EditPlaylistForm = ({ playlist, editPlaylist, setPlaylistId, handleSubmit, register}: Props) => {

    const [updatePlaylist] = useUpdatePlaylistMutation()

    const onSubmit: SubmitHandler<UpdatePlaylistArgs> = (body: UpdatePlaylistArgs) => {
        if(!playlist) return
        updatePlaylist({playlistId: playlist.id, body}).then(() => setPlaylistId(null))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Edit playlist</h2>
            <div>
                <input {...register('title')} placeholder={'title'}/>
            </div>
            <div>
                <input {...register('description')} placeholder={'description'}/>
            </div>
            <button type={'submit'}>save</button>
            <button type={'button'} onClick={() => editPlaylist(null)}>
                cancel
            </button>
        </form>
    )
}