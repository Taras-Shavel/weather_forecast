import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./redux";



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
let store = setupStore();
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>

);


