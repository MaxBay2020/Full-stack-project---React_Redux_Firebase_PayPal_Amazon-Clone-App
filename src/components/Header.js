import React from 'react'
import '../styles/Header.css'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {initializeApp} from "firebase/app";
import firebaseConfig from "../firebase/firebase-config";
import {getAuth, signOut} from "firebase/auth";
import {logout} from "../features/user"
import {useCookies} from 'react-cookie'

const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.user.cart)
    // const user = useSelector(state => state.user.user)

    const [cookies, removeCookie] = useCookies()


    const handleLogout = () => {
        // connect to firestore
        initializeApp(firebaseConfig)
        const auth = getAuth()
        dispatch(logout())
        signOut(auth).then(()=>navigate('/login'))
        removeCookie('user')
    }

    return (
        <div className='header'>
            {/* amazon logo */}
            <Link to='/'>
                <img className='header-logo' src="https://jitsvinger.co.za/wp-content/uploads/2018/04/Amazon-Logo-1024x373.png" alt="amazon logo"/>
            </Link>

            {/* search bar */}
            <div className='header-searchBar'>
                <input className='header-searchInput' type="text"/>
                <button className='header-searchBar-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-1 w-1" fill="none" viewBox="0 0 24 24" stroke="#333" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>

            {/* menu */}
            <div className='header-menu'>
                <div className='header-option'>
                    <Link to={!cookies.user && '/login'} style={{ textDecoration: 'none' }}>
                        <p className="header-optionLine1">Hello {!cookies.user || cookies.user === 'undefined' ? 'Guest' : cookies.user }</p>
                        <p onClick={()=>handleLogout()} className="header-optionLine2">Sign {`${!cookies.user || cookies.user === 'undefined' ? 'In' : 'Out'}`}</p>
                    </Link>
                </div>

                <div className='header-option'>
                    <p className="header-optionLine1">Returns</p>
                    <p className="header-optionLine2">& Orders</p>
                </div>
                <div className='header-option'>
                    <p className="header-optionLine1">Your</p>
                    <p className="header-optionLine2">Prime</p>
                </div>

                {/* cart */}
                <Link to='/cart' style={{ textDecoration: 'none' }}>
                    <div className='header-option header-cart-container'>
                        <div className='header-cartAndtext'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" strokeWidth="1">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                            </svg>
                            <div>{cart.length}</div>
                        </div>
                        <div className='header-cart-container-text'>cart</div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Header;
