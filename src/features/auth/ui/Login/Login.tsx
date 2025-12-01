import React from 'react';
import {useLoginMutation} from '@/features/auth/api/authApi';
import {Path} from '@/common/routing';

export const Login = () => {

    const [login] = useLoginMutation()

    const loginHandler = () => {
        // это адрес нашего фронтенд приложения, которое вконце будет открыто в нашем окошке
        // именно на эту страницу будет передан code
        const redirectUri = import.meta.env.VITE_DOMAIN_ADDRESS + Path.OAuthRedirect

        // этот url передаем на бэк, чтобы он сделал свой редирект
        const url = `${import.meta.env.VITE_BASE_URL}/auth/oauth-redirect?callbackUrl=${redirectUri}`

        // далее открываем наш попап
        window.open(url, 'oauthPopup', 'width=500,height=500')

        const receiveMessage = (event: MessageEvent) => {
            if(event.origin !== import.meta.env.VITE_DOMAIN_ADDRESS) return

            // в итоге после отправки сообщения (postMessage) попадаем сюда, считаваем code
            const { code } = event.data

            if(!code) return

            // делаем отписку от этого message и делаем login
            window.removeEventListener('message', receiveMessage)
            login({ code, redirectUri, rememberMe: false })
        }

        // подписка на наше сообщение
        window.addEventListener('message', receiveMessage)
    }

    return (
        <>
            <button onClick={loginHandler} type={'button'}>login</button>
        </>
    );
};