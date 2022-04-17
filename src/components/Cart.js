import React from 'react';
import '../styles/Cart.css'
import CartItem from "./CartItem";
import CheckoutPanel from "./CheckoutPanel"
import { useSelector } from 'react-redux'
import {Link} from "react-router-dom";

const Cart = () => {

    const cartItems = useSelector((state) => state.user?.cart)

    if(cartItems.length===0)
        return (
            <div className='cart-empty-container'>
                <h2>Your cart is empty</h2>
                <Link to='/' className='cart-empty-container-link' >Go shopping 🛒</Link>
            </div>
        )

    return (
        <div className="cart">
            <div className="cart-container">
                <div className="cart-items">
                    <p className='cart-banner'>
                        <img src="https://content26.com/wp-content/uploads/prime-day-2018-banner.jpg" alt=""/>
                    </p>
                    <h2>Your Shopping Cart</h2>
                    {/* items */}
                    {
                        cartItems.map(cartItem => (
                            <CartItem
                                key={cartItem.id}
                                id={cartItem.id}
                                amount={cartItem.amount}
                                title={cartItem.title}
                                price={cartItem.price}
                                rating={cartItem.rating}
                                imgUrl={cartItem.imgUrl}
                            />
                        ))
                    }


                </div>
                <div className="cart-checkout">
                    <CheckoutPanel />
                </div>
            </div>
        </div>

    );
};

export default Cart;
