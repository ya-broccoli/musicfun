import { NavLink } from 'react-router'
import s from './Header.module.css'
import React from 'react'
import {Path} from '@/common/routing';

export const Header = () => {
    const navItems = [
        { to: Path.Main, label: 'Main' },
        { to: Path.Playlists, label: 'Playlists' },
        { to: Path.Tracks, label: 'Tracks' },
        { to: Path.Profile, label: 'Profile' },
    ]

    return (
        <header className={s.container}>
            <nav>
                <ul className={s.list}>
                    {navItems.map(item => (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) => `link ${isActive ? s.activeLink : ''}`}
                            >
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}