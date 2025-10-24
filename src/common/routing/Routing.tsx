// @flow
import * as React from 'react';
import { Route, Routes } from 'react-router'
import { MainPage } from '@/app/ui/MainPage/MainPage';
import { PlaylistsPage } from '@/features/playlists/ui/PlaylistsPage';
import { TracksPage } from '@/features/tracks/ui/TracksPage/TracksPage';
import { ProfilePage } from '@/features/auth/ui/ProfilePage/ProfilePage';
import { PageNotFound } from '@/common/components';

export const Path = {
    Main: '/',
    Playlists: '/playlists',
    Tracks: '/tracks',
    Profile: '/profile',
    NotFound: '*',
} as const

export const Routing = () => (
    <Routes>
        <Route path={Path.Main} element={<MainPage />} />
        <Route path={Path.Playlists} element={<PlaylistsPage />} />
        <Route path={Path.Tracks} element={<TracksPage />} />
        <Route path={Path.Profile} element={<ProfilePage />} />
        <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
)