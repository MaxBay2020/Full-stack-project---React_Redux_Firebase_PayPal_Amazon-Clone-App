import React, {useState, useEffect} from 'react'
import NumberFormat from 'react-number-format'
import '../styles/CheckoutPanel.css'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useCookies} from "react-cookie";

const CheckoutPanel = () => {

    const [items, setItems] = useState([])

    const cart = useSelector( state => state.user.cart)
    const [total, setTotal] = useState(0);

    const navigate = useNavigate()
    const [cookies]=useCookies()

    useEffect(() => {
        setTotal(cart?.reduce((total, item) => total + item.price * item.amount, 0))
        const newItems = cart.map(item => {
            return {
                id: item.id,
                title: item.title,
                price: item.price,
                amount: item.amount
            }
        })
        setItems(newItems)
    }, [cart]);


    const gotoStripe = () => {
        if(!cookies.user || cookies.user==='undefined')
            navigate('/login')
        else{
            navigate('/payment')
        }
    }

    return (
        <div className='checkoutPanel'>
            <p className='total'>Subtotal ({cart.length} items):&nbsp;
                <NumberFormat
                    value={total}
                    className="total"
                    displayType={'text'}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    thousandSeparator={true}
                    prefix={'$'}
                    renderText={(value, props) => <strong {...props}>{value}</strong>}
                />
                {/*<strong>$ {total}</strong>*/}
            </p>
            <p className='gift'>
                <input type="checkbox"/>
                <span>This order contains a gift</span>
            </p>
            <p className='proceed-btn'>
                <button onClick={()=>gotoStripe()}>Proceed to Checkout</button>
            </p>
        </div>
    )
}

export default CheckoutPanel;
