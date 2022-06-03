import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './app';
import { createRoot } from 'react-dom/client';
import { store } from './app/store'
import { Provider } from 'react-redux'

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript

root.render(
    <Router>
        <Provider store={store}>
            <App tab="home" />
        </Provider>
    </Router>
);