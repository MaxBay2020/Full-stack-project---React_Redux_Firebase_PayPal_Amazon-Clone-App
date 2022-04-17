import React, {useEffect, useState} from 'react'
import '../styles/Payment.css'
import {useSelector} from "react-redux"
import {useCookies} from "react-cookie"
import {useNavigate} from 'react-router-dom'
import CartItem from "./CartItem";
import Address from "./Address";
import CardNumber from "./CardNumber";

const Payment = () => {
    const [count, setCount] = useState(0);
    const cartItems = useSelector(state => state.user?.cart)
    const [cookies] = useCookies()
    const navigate = useNavigate()


    useEffect(() => {
        if(cartItems.length===0){
            console.log('empty')
        }
        if(cookies.user === 'undefined' || !cookies.user || cartItems.length===0)
            return navigate('/login')
        const newCount = cartItems.map(item => item.amount)?.reduce((pre, next) => pre + next)
        setCount(newCount)
    }, [cartItems]);





    return (
        <div className="bg">


        <div className='container'>
            <section className="title">Checkout ({count} items）</section>

            <section className="payment">

                <h3>Delivery Address</h3>
                <Address />

                <h3>Delivery Items</h3>
                <div className="items">
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

                <h3>Payment Method</h3>
                <div className="card-details">
                    <CardNumber />
                </div>

            </section>
            {/*<section className='payment-title'>Checkout (1 items)</section>*/}

            {/* <div className='payment'>*/}
            {/*    <section className="payment-delivery">*/}
            {/*        <h3>Delivery Address</h3>*/}
            {/*        <section className="payment-address">*/}
            {/*            27 Coledale Road Markham, Toronto, ON.*/}
            {/*        </section>*/}
            {/*    </section>*/}

            {/*    <section className="payment-details">*/}
            {/*        <h3>Delivery Items</h3>*/}
            {/*        <div className="items">*/}
            {/*            <div>Item 1</div>*/}
            {/*            <div>Item 2</div>*/}
            {/*            <div>Item 3</div>*/}
            {/*        </div>*/}
            {/*    </section>*/}

            {/*    <section className="payment-method">*/}
            {/*        <h3>Payment Method</h3>*/}
            {/*        <div className="card-details">*/}

            {/*        </div>*/}
            {/*    </section>*/}
            {/*</div>*/}
        </div>
        </div>
    );
};

export default Payment;
