import React, {useEffect, useState} from 'react'
import '../styles/Stripe.css'
import NumberFormat from 'react-number-format'
import {useSelector} from 'react-redux'
import PieceDetail from "./PieceDetail"
import {PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer} from "@paypal/react-paypal-js";

const Stripe = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const cart = useSelector( state => state.user.cart)
    const [items, setItems] = useState([])
    const [showPaypalBtn, setShowPaypalBtn] = useState(false);

    // const [{ isPending }] = usePayPalScriptReducer()


    useEffect(() => {
        setTotalPrice(cart?.reduce((total, item) => total + item.price * item.amount, 0))
        setItems(cart?.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.amount
        })))
    }, [cart]);


    const handleCharge = async () => {
        console.log(totalPrice > 0)

    }

    const createOrder = async (data, actions) => {
        return await actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        value: totalPrice
                    }
                }
            ]
        })
    }

    return (
        <PayPalScriptProvider
            options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
        >
        <div className='stripe-container'>
            <div className="place-order">
                <div className="stripe-details">
                    <p>Name</p>
                    <p>Price</p>
                    <p>Quantity</p>
                </div>
                {
                    items.map(item => (
                        <PieceDetail key={item.id} {...item} />
                    ))
                }

                <p className='place-order-total'>Order Total:&nbsp;
                    <NumberFormat
                        value={totalPrice}
                        className="place-order-total"
                        displayType={'text'}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        thousandSeparator={true}
                        prefix={'$'}
                        renderText={(value, props) => <strong {...props}>{value}</strong>}
                    />
                </p>
                {
                    !showPaypalBtn &&
                    <button
                        onClick={()=>setShowPaypalBtn(true)}
                        className='buy-btn'
                    >
                        Buy Now
                    </button>
                }

                {
                    showPaypalBtn &&
                    <div className='paypal-btn'>
                        <PayPalButtons
                            createOrder={createOrder}
                            onApprove={(data, actions) => {
                                return actions.order.capture().then((details) => {
                                    const name = details.payer.name.given_name;
                                    alert(`Transaction completed by ${name}`);
                                });
                            }}
                        />
                    </div>
                }
            </div>
        </div>
        </PayPalScriptProvider>

    );
};

export default Stripe;
