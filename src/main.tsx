import React from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './app/ui/App/App'
import {BrowserRouter} from 'react-router'
import {Provider} from 'react-redux';
import {store} from '@/app/model/store';

const rootElement = document.getElementById('root') as HTMLElement

createRoot(rootElement).render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
)
