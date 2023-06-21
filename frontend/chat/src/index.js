import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import App from './App.js';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import AuthReduser from './redux/reducers/AuthReduser';
import chat from './redux/chatSlice';
const store = configureStore({
    reducer: {
       login: AuthReduser,
       chat
    }
});
ReactDOM.createRoot(document.getElementById("root")).render(

    <Provider store={store}>
        <App />
    </Provider>
);