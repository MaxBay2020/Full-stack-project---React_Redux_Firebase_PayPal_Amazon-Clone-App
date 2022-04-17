import React, {useEffect, useState} from 'react'
import '../styles/Home.css'
import Product from "./Product";
import db from '../firebase/firebase-connection'
import {
    collection,
    onSnapshot,


} from 'firebase/firestore'

const Home = () => {

    const [products, setProducts] = useState([]);

    const productsCollection=collection(db, 'products')

    const getAllProductsRealTimeUpdate = () => {
        onSnapshot(productsCollection, snapshot => {
            const allProducts = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
            setProducts(allProducts)
        })
    }

    useEffect(() => {
        getAllProductsRealTimeUpdate()
    }, []);

    return (
        <div className='home'>
            <div className='home-container'>
                <img src="https://store-images.s-microsoft.com/image/apps.53280.13756631990520576.c7bf8936-a11d-4c89-b498-2442c2977baf.7cd42ed2-955c-4a17-91aa-842c072a1056" alt=""/>

                {/*<div className="home-row">*/}
                {/*/!* product *!/*/}
                {/*    <Product />*/}
                {/*    <Product />*/}
                {/*/!* product *!/*/}
                {/*</div>*/}

                {/*<div className="home-row">*/}
                {/*    /!* product *!/*/}
                {/*    /!* product *!/*/}
                {/*    /!* product *!/*/}
                {/*</div>*/}

                {/*<div className="home-row">*/}
                {/*    /!* product *!/*/}
                {/*</div>*/}

                <div className="products">
                    {
                        products.map(product => {
                            return (
                                <Product
                                    key={product.id}
                                    {...product}
                                />
                            )
                        })
                    }
                    {/*<Product*/}
                    {/*    id='1243142'*/}
                    {/*    title='The Lean Startup: How Constant innovation...'*/}
                    {/*    price={12.99}*/}
                    {/*    rating={5}*/}
                    {/*    imgUrl='https://m.media-amazon.com/images/I/41Kad-3GehL._AC_SY230_.jpg'*/}
                    {/*/>*/}
                    {/*<Product*/}
                    {/*    id='asdf1'*/}
                    {/*    title='Best protein'*/}
                    {/*    price={86.99}*/}
                    {/*    rating={4}*/}
                    {/*    imgUrl='https://m.media-amazon.com/images/I/61sqBywOF8L._AC_SY238_.jpg'*/}
                    {/*/>*/}
                    {/*<Product*/}
                    {/*    id='tkjytb'*/}
                    {/*    title='Best protein'*/}
                    {/*    price={86.99}*/}
                    {/*    rating={4}*/}
                    {/*    imgUrl='https://m.media-amazon.com/images/I/81r6LdXcKtL._AC_SY238_.jpg'*/}
                    {/*/>*/}
                    {/*<Product*/}
                    {/*    id='567bda2fg'*/}
                    {/*    title='Best protein'*/}
                    {/*    price={86.99}*/}
                    {/*    rating={4}*/}
                    {/*    imgUrl='https://m.media-amazon.com/images/I/71QJO2Wt8EL._AC_SY270_.jpg'*/}
                    {/*/>*/}
                    {/*<Product*/}
                    {/*    id='dsfg452jh56f23'*/}
                    {/*    title='Best protein'*/}
                    {/*    price={86.99}*/}
                    {/*    rating={4}*/}
                    {/*    imgUrl='https://m.media-amazon.com/images/I/41MWgpKcU4L._SY500__AC_SY400_.jpg'*/}
                    {/*/>*/}
                    {/*<Product*/}
                    {/*    id='1e24sfdf34156ga142'*/}
                    {/*    title='Best protein'*/}
                    {/*    price={86.99}*/}
                    {/*    rating={4}*/}
                    {/*    imgUrl='https://images-na.ssl-images-amazon.com/images/G/15/CA-hq/2022/img/DVD/XCM_CUTTLE_1417032_2248337_CA_CUTTLE_758x608_2X_en_CA._SY608_CB626744520_.jpg'*/}
                    {/*/>*/}


                </div>
            </div>
        </div>
    );
};

export default Home;
