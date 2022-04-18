import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import userReducer from './features/user'
import {CookiesProvider} from 'react-cookie'

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
    reducer: {
        user: userReducer
    },
    middleware: []
})

const initialOptions = {
    "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID
}

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <Router>
              <CookiesProvider>
                    <App />
              </CookiesProvider>
          </Router>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
