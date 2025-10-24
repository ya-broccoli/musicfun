import * as React from 'react';
import {useInfiniteScroll} from '@/common/hooks';
import {RefObject} from 'react';

type Props = {
    observerRef: RefObject<HTMLDivElement | null>
    isFetchingNextPage: boolean
}

export const LoadingTrigger = ({ observerRef, isFetchingNextPage }: Props) => {

    return (
        <div ref={observerRef}>
            {/*`<div style={{ height: '20px' }} />` создает "невидимую зону" в 20px в конце списка,*/}
            {/*при достижении которой автоматически загружаются новые треки. Без размеров*/}
            {/*IntersectionObserver не будет работать корректно.*/}
            {isFetchingNextPage ? (
                <div>Loading more tracks...</div>
            ) : (
                <div style={{height: '20px'}}/>
            )}
        </div>
    );
};