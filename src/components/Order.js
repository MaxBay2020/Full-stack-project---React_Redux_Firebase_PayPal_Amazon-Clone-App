import React, {useState, useEffect} from 'react'
import '../styles/Order.css'
import {useParams} from "react-router-dom"
import {
    collection,
    getDoc,
    doc,


} from 'firebase/firestore'

import db from '../firebase/firebase-connection'
import {useNavigate} from 'react-router-dom'
import {useSelector} from "react-redux";
import OrderItem from "./OrderItem"
import NumberFormat from "react-number-format";


const Order = () => {
    const [orderId, setOrderId] = useState(useParams().orderId)
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)
    const [orderItems, setOrderItems] = useState([])
    const [deliveryAddress, setDeliveryAddress] = useState('');

    useEffect(() => {
        if(!user.email)
            return navigate('/login')
        else
            getOrderDetail()
    }, []);

    const getOrderDetail = async () => {
        const orderRef = doc(db, 'orders', orderId)
        const orderDoc = await getDoc(orderRef)
        setDeliveryAddress(orderDoc.data()['delivery_address'])
        let temp= {}
        temp = orderDoc.data()
        delete temp['delivery_address']
        setOrderItems(Object.values(temp))
    }

    console.log('orderDetails',orderItems)
    console.log('deliveryAddress', deliveryAddress)

    return (
        <div className='cart-items'>
            <h2>Order: {orderId}</h2>
            {
                orderItems.map(item => (
                    <OrderItem key={item.id} {...item} />
                ))
            }
            <div className='order-total-container'>
                <h3>Total:</h3>
                <NumberFormat
                    value={orderItems.length > 0 && orderItems.reduce((total, currentItem) => total + currentItem.price * currentItem.amount, 0)}
                    className="order-total"
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    renderText={(value, props) => <div {...props}>{value}</div>}
                />
            </div>
        </div>
    );
};

export default Order;
