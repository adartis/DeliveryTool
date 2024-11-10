// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client' instead of 'react-dom'
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root with createRoot
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
