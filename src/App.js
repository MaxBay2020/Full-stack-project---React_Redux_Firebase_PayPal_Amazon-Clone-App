import './styles/App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import {
    Routes,
    Route
} from 'react-router-dom'
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import React, {useEffect} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {initializeApp} from "firebase/app";
import firebaseConfig from "./firebase/firebase-config";
import {getFirestore} from "firebase/firestore";
import Payment from "./components/Payment";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {CookiesProvider} from "react-cookie";



function App() {

    // connect to firestore
    initializeApp(firebaseConfig)
    const db = getFirestore()
    const auth = getAuth()

    useEffect(() => {
        const unsubAuth = onAuthStateChanged(auth, user => {
            console.log('current user status: ', user)
        })
        return unsubAuth()
    }, []);

  return (
            <div className="app">
                {/* Header */}
                <Header />
                {/* Pages */}
                <Routes>
                    {/* Home page */}
                    <Route path='/' element={<Home />} />
                    {/* Cart page*/}
                    <Route path='/cart' element={<Cart />} />
                    {/* Login page*/}
                    <Route path='/login' element={<Login />} />
                    {/* Register page*/}
                    <Route path='/register' element={<Register />} />
                    {/*Payment page*/}
                    <Route path='/payment' element={<Payment />} />
                </Routes>
            </div>

  );
}

export default App;
