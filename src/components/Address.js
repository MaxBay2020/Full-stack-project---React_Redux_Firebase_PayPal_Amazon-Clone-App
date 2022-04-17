import React, {useState} from 'react';
import '../styles/Address.css'

const Address = () => {

    const [address, setAddress] = useState({
        road: '27 Coledale Road Markham',
        city: 'Toronto',
        province: 'ON'
    })

    const [showForm, setShowForm] = useState(false);

    const confirmAddress = (e) => {
        e.preventDefault()
        setShowForm(false)
        console.log(address)
    }

    const handleAddress = (e) => {
        const {name, value} = e.target
        setAddress({
            ...address,
            [name]: value
        })
    }


    return (
        <div>
            <div className='address-container'>
                <span className='address'>
                    {
                        Object.values(address).reduce((prev, next) => prev + ', ' + next)
                    }
                </span>
                {
                    !showForm && <span onClick={()=>setShowForm(true)} className='edit-btn'>Edit</span>
                }

            </div>

            {
                showForm &&

            <form onSubmit={(e) => confirmAddress(e)}>
                <label htmlFor="address-road">Road</label>
                <input
                    id='address-road'
                    type="text"
                    placeholder="Please enter your road"
                    name='road'
                    onChange={(e) => handleAddress(e)}
                />

                <label htmlFor="address-city">City</label>
                <input
                    id='address-city'
                    type="text"
                    placeholder="Please enter your city"
                    name='city'
                    onChange={(e) => handleAddress(e)}
                />

                <label htmlFor="address-province">Province</label>
                <input
                    id='address-province'
                    type="text"
                    placeholder="Please enter your province"
                    name='province'
                    onChange={(e) => handleAddress(e)}
                />

                <input className='confirm-btn' type="submit" value='Confirm'/>
            </form>
            }
        </div>
    );
};

export default Address;
