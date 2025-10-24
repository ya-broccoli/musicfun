import React from 'react';
import {useFetchTracksInfiniteQuery} from '@/features/tracks/api/tracksApi';
import {useInfiniteScroll} from '@/common/hooks';
import {TracksList} from '@/features/tracks/ui/TracksPage/TracksList/TracksList';
import {LoadingTrigger} from '@/features/tracks/ui/TracksPage/LoadingTrigger/LoadingTrigger';

export const TracksPage = () => {
    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useFetchTracksInfiniteQuery()

    const { observerRef } = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetching})

    const pages = data?.pages.flatMap(page => page.data) || []

    return (
        <div>
            <h1>Tracks page</h1>
            <TracksList tracks={pages} />
            {/*Этот элемент отслеживается IntersectionObserver*/}
            {hasNextPage && <LoadingTrigger observerRef={observerRef} isFetchingNextPage={isFetchingNextPage} />}
            {!hasNextPage && pages.length > 0 && <p>Nothing more to load</p>}
        </div>
    )
}
