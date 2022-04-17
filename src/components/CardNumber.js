import React, {useEffect, useState} from 'react'
import '../styles/CardNumber.css'
import NumberFormat from 'react-number-format'
import {useSelector} from 'react-redux'

const CardNumber = () => {
    const [number, setNumber] = useState(424242424242424)
    const [total, setTotal] = useState(0);
    const cart = useSelector( state => state.user.cart)


    useEffect(() => {
        setTotal(cart?.reduce((total, item) => total + item.price * item.amount, 0))
    }, [cart]);


    const handlePayment = () => {
        console.log(total)
    }

    return (
        <div className='CardNumber'>
            <h4>Card Details</h4>
                <NumberFormat
                    className='card-number'
                    displayType={'input'}
                    value={number}
                    format="#### #### #### ####"
                />

            <div className="place-order">
                <p className='total'>Order Total:&nbsp;
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
                </p>

                <button
                    className='buy-btn'
                    onClick={()=>handlePayment()}
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default CardNumber;
