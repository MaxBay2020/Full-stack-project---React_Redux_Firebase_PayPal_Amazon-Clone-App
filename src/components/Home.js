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

                </div>
            </div>
        </div>
    );
};

export default Home;
