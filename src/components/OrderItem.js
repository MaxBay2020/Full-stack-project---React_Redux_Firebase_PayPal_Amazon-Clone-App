import React from 'react'
import '../styles/CartItem.css'
import '../styles/OrderItem.css'


const OrderItem = (props) => {
    const {id, amount, title, price, rating, imgUrl}=props


    return (
        <div className='item'>
            <div className="item-img">
                <img src={imgUrl} alt=""/>
            </div>

            <div className="item-details">
                <p className="item-title">{title.substring(0, 80)}</p>
                <p className='item-price'>$<strong>{price}</strong></p>
                <p className='item-amount'>Amount: <span>{amount}</span></p>
                {
                    [...Array(rating)].map((star, index) => (
                        <svg key={index} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                    ))
                }
            </div>
        </div>
    );
};

export default OrderItem;
