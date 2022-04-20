import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: {
        id: '',
        name: '',
        email: '',
        address: '',
    },
    delivery_address: '',
    cart: [],
    orders: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user.email = action.payload.email
            state.user.id=action.payload.id
        },
        logout: (state, action) => {
            state.user = initialState.user
            state.orders=initialState.orders
        },
        addToCart: (state, action) => {
            const item = state.cart?.find(item => item.id === action.payload.id)
            if(item){
                // if item already exists
                item.amount++
            }else{
                // if item doesnt exist
                const item = {...action.payload, amount: 1}
                state.cart.push(item)
            }

        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload.id)
        },
        addToOrder: (state, action) => {
            const {items} = action.payload
            console.log(action.payload)
            state.orders.push({
                items
            })
        },
        changeAddress: (state, action) => {
            state.delivery_address=action.payload
        },
        clearCartAndDeliveryAddress: (state, action) => {
            state.delivery_address=''
            state.cart=[]
        }

    }
})

export const {
    login,
    logout,
    addToCart,
    removeFromCart,
    addToOrder,
    changeAddress,
    clearCartAndDeliveryAddress
} = userSlice.actions
export default userSlice.reducer

