import React from "react"
import {SubmitHandler, useForm} from 'react-hook-form';
import {CreatePlaylistArgs} from '@/features/playlists/api/playlistsApi.types';
import {useCreatePlaylistMutation} from '@/features/playlists/api/playlistsApi';

export const CreatePlaylistForm = () => {
    const { register, handleSubmit, reset } = useForm<CreatePlaylistArgs>()

    const [ createPlaylist ] = useCreatePlaylistMutation()

    const onSubmit: SubmitHandler<CreatePlaylistArgs> = data => {
        createPlaylist(data).unwrap().then(() => reset())
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Create new playlist</h2>
            <div>
                <input {...register('title')} placeholder={'title'} />
            </div>
            <div>
                <input {...register('description')} placeholder={'description'} />
            </div>
            <button>create playlist</button>
        </form>
    )
}
