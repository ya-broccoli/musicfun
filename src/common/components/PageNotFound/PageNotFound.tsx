import React from 'react'
import s from '../PageNotFound/PageNotFound.module.css'

export const PageNotFound = () => {
    return (
        <>
            <h1 className={s.title}>404</h1>
            <h2 className={s.subtitle}>page not found</h2>
        </>
    )
}