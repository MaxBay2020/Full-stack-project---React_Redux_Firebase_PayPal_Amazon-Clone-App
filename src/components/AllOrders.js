import React, {useState, useEffect} from 'react'
import '../styles/allOrders.css'
import {useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {
    doc,
    getDoc,
} from 'firebase/firestore'
import db from '../firebase/firebase-connection'
import '../styles/Cart.css'

const AllOrders = () => {
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()
    const [ordersId, setOrdersId] = useState([])
    const [orders, setOrders] = useState([])
    const [orderId, setOrderId] = useState('');

    useEffect( () => {
        if(!user.email)
            return navigate('/login')
        else
            findAllOrders(user.id)
    }, []);


    const findAllOrders = async (id) => {
        // find user by id
        const userDoc = doc(db, 'users', id)
        const theDoc = await getDoc(userDoc)
        const ordersId = theDoc.data().orders

        // find all orders
        let temp=[]
        const allOrders = ordersId.map(async orderId => {
            const docRef = doc(db, 'orders', orderId)
            const docSnap = await getDoc(docRef)
            const obj = docSnap.data()
            obj.orderId = orderId
            temp.push(obj)
            setOrders(temp)
            return docSnap.data()
        })
    }

    const  goToOrderDetailPage = (e) => {
        e.stopPropagation()
        navigate(`/order/${e.target.getAttribute('orderid')}`)
    }

    if(orders.length===0)
        return (
            <div className='cart-empty-container'>
                <h2>You haven't bought anything yet. 😣</h2>
                <Link to='/' className='cart-empty-container-link' >Go shopping 🛒</Link>
            </div>
        )

    return (
        <div className='allOrders'>
                {
                    orders.map((order, index) => {

                        return (
                            <div onClick={(e)=>goToOrderDetailPage(e)}
                                 key={order['orderId']}
                                 className='orders-container'
                                 orderid={order['orderId']}>

                                <div className="orders">
                                    {/* order ID */}
                                    <div className="orderId-container">
                                        <div className="header-orderId">Order ID</div>
                                        <p className='orders-id'>{order['orderId']}</p>
                                    </div>
                                    {/* name of the first item of an order */}
                                    <div className="orderTitle-container">
                                        <div className="header-items">Items contained</div>
                                        <p className='orders-title'>{order[0].title.substring(0, 20) + '...'}</p>

                                    </div>
                                    {/* number of items */}
                                    <div className="orders-count">
                                        <div className="header-number">Items number</div>
                                        <p className='orders-number'>{Object.keys(order).length - 1}</p>
                                    </div>

                                    <div className="orders-img-container">
                                        <div className="header-img">Items image</div>
                                        <p className='orders-img'>
                                            <img src={order[0].imgUrl} alt=""/>
                                        </p>
                                    </div>

                                    <div className="orders-address">
                                        <div className="header-address">Delivery address</div>
                                        <div className="delivery-address-container">
                                            <p className="orders-address-road">{order['delivery_address'].road}</p>
                                            <p className="orders-address-city">{order['delivery_address'].city}</p>
                                            <p className="orders-address-province">{order['delivery_address'].province}</p>
                                        </div>
                                    </div>

                                    <div className="orders-check">
                                        <div className="header-check">Check details</div>
                                        <button
                                            onClick={(e)=>goToOrderDetailPage(e)}
                                            className='orders-check-btn'
                                            orderid={order['orderId']}
                                        >
                                            check
                                        </button>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }
            {/*</div>*/}

        </div>
    );
}

export default AllOrders;
