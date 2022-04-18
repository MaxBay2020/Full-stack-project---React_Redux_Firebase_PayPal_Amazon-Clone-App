import React from 'react'
import '../styles/PieceDetail.css'
import NumberFormat from "react-number-format";

const PieceDetail = ({id, title, price, quantity}) => {
    return (
        <div className='piece-detail'>
            <p className='piece-detail-title'>{title.substring(0,15)+'...'}</p>
            <p>
                <NumberFormat
                value={price}
                className='piece-detail-price'
                displayType={'text'}
                decimalScale={2}
                fixedDecimalScale={true}
                thousandSeparator={true}
                prefix={'$'}
                renderText={(value, props) => <strong {...props}>{value}</strong>}
            />
            </p>
            <p className='piece-detail-quantity'>{quantity}</p>
        </div>
    );
};

export default PieceDetail;
