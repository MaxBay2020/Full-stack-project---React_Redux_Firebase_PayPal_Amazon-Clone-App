import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    user: {
        name: '',
        email: '',
        address: '',
    },
    cart: [],
    orders: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user.email = action.payload.email
        },
        logout: (state, action) => {
            state.user = initialState.user
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
            console.log(state.cart)
            state.cart = state.cart.filter(item => item.id !== action.payload.id)
        }

    }
})

export const {
    login,
    logout,
    addToCart,
    removeFromCart,
} = userSlice.actions
export default userSlice.reducer

