import * as React from 'react';
import s from './TracksList.module.css';
import {TrackData} from '@/features/tracks/api/tracksApi.types';

type Props = {
    tracks: TrackData[]
}

export const TracksList = ({ tracks }: Props) => {
    return (
        <div className={s.list}>
            {tracks.map(track => {
                const {title, user, attachments} = track.attributes

                return (
                    <div key={track.id} className={s.item}>
                        <div>
                            <p>Title: {title}</p>
                            <p>Name: {user.name}</p>
                        </div>
                        {attachments.length ? <audio controls src={attachments[0].url}/> : 'no file'}
                    </div>
                )
            })}
        </div>
    )
}
