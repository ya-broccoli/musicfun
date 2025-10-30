import * as React from 'react'
import {ChangeEvent} from 'react'
import s from '@/features/playlists/ui/PlaylistsPage.module.css';
import {useDeletePlaylistCoverMutation, useUploadPlaylistCoverMutation} from '@/features/playlists/api/playlistsApi';
import defaultCover from '@/assets/images/default-playlist-cover.png';
import {Images} from '@/common/types';
import {errorToast} from '@/common/utils';

type Props = {
    playlistId: string
    images: Images
}

export const PlaylistCover = ({ playlistId, images }: Props) => {

    const [uploadPlaylistCover] = useUploadPlaylistCoverMutation()
    const [deleteCover] = useDeletePlaylistCoverMutation()

    const originalCover = images.main.find( img => img.type === 'original')
    const src = originalCover ? originalCover.url : defaultCover

    const uploadCoverHandler = (e: ChangeEvent<HTMLInputElement>) => {

        const maxSize = 1024 * 1024   // 1MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']

        const file = e.target.files?.length && e.target.files[0]
        if(!file) return

        if(!allowedTypes.includes(file.type)) {
            errorToast('Only JPEG, PNG or GIF images are allowed')
            return
        }

        if(file.size > maxSize) {
            errorToast(`The file is too large. Max size is ${Math.round(maxSize / 1024)} KB`)
            return
        }

        uploadPlaylistCover({playlistId, file})
    }

    const deleteCoverHandler = () => {
        deleteCover(playlistId)
    }

    return (
        <>
            <img src={src} width={'240px'} height={'240px'} className={s.cover} alt="cover"/>
            <input type="file" onChange={uploadCoverHandler} accept={"image/jpeg, image/png, image/gif"} />
            {originalCover && <button onClick={deleteCoverHandler}>delete cover</button>}
        </>
    )
}