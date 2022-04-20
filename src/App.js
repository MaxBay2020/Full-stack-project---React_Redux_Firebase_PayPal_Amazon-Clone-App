import './styles/App.css';
import Header from "./components/Header";
import Home from "./components/Home";
import {
    Routes,
    Route
} from 'react-router-dom'
import Cart from "./components/Cart";
import Login from "./components/Login";
import React, {useEffect} from "react";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {initializeApp} from "firebase/app";
import firebaseConfig from "./firebase/firebase-config";
import {getFirestore} from "firebase/firestore";
import Payment from "./components/Payment";
import AllOrders from "./components/AllOrders";
import Order from "./components/Order";



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
                    {/* Cart page */}
                    <Route path='/cart' element={<Cart />} />
                    {/* Login page */}
                    <Route path='/login' element={<Login />} />

                    {/* Payment page */}
                    <Route path='/payment' element={<Payment />} />
                    {/* All Orders page */}
                    <Route path='/order' element={<AllOrders />} />
                    {/* Order page */}
                    <Route path='/order/:orderId' element={<Order />}/>
                </Routes>
            </div>

  );
}

export default App;
