import React, {useEffect, useState} from 'react'
import '../styles/PayPal.css'
import NumberFormat from 'react-number-format'
import {useDispatch, useSelector} from 'react-redux'
import PieceDetail from "./PieceDetail"
import {PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import {addDoc, collection} from "firebase/firestore"
import db from '../firebase/firebase-connection'
import {addToOrder, clearCartAndDeliveryAddress} from "../features/user"
import {
    doc,
    updateDoc,
    arrayUnion
} from 'firebase/firestore'
import {useNavigate} from "react-router-dom";

const PayPal = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const cart = useSelector( state => state.user.cart)
    const user = useSelector(state => state.user.user)
    const delivery_address = useSelector(state => state.user.delivery_address)
    const [items, setItems] = useState([])
    const [showPaypalBtn, setShowPaypalBtn] = useState(false);

    const [orderID, setOrderID] = useState('')

    const dispatch = useDispatch()

    const navigate = useNavigate()


    useEffect(() => {
        setTotalPrice(cart?.reduce((total, item) => total + item.price * item.amount, 0))
        setItems(cart?.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.amount
        })))
    }, [cart]);


    const createOrder = async (data, actions) => {
        const orderId = await actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: 'USD',
                        // value: totalPrice
                        value: '0.1'
                    }
                }
            ]
        })

        setOrderID(orderId)
        return orderId
    }

    // add order to firebase
    const createOrderInDB = async () => {
        const orderCollection = collection(db, 'orders')
        const newOrder = {
            delivery_address,
            ...cart
        }
        // get order id
        const {id} = await addDoc(orderCollection, newOrder)

        // add this order to the logged user
        const userRef = await doc(db, 'users', user.id)
        await updateDoc(userRef, {
            orders: arrayUnion(id)
        })

        // update order
        dispatch(addToOrder({
            // delivery_address,
            items: cart,
        }))

        // clear cart in redux store
        dispatch(clearCartAndDeliveryAddress())

        navigate(`/order/${id}`)
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
                                    createOrderInDB()
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

export default PayPal;
