import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cart:[]
    } ,//[],
    reducers: {
        setCart(state, {payload}){
        //     return [///nuyn ___username ov array sarqum 
        //     ...payload
        //   ]
        state.cart.push(...payload)
        },
        delCart(state){
            state.cart = []
        },
        addToCart(state, {payload}){
            const itemInCart = state.cart?.find((item)=>item.id === payload.id);
            if(itemInCart){
                itemInCart.price = itemInCart.price + itemInCart.price / itemInCart.count;
                itemInCart.count++;
            }else{
                state.cart.push({...payload, count:1});
            }
            // return [...state, {...payload}]
        },
        incrementCount(state, {payload}){
            const item = state.cart.find(item => item.id === payload);
            item.price = item.price + item.price/item.count;
            item.count++;
        },
        decrementCount(state, {payload}){
            const item = state.cart.find(item => item.id === payload);
            if(item.count === 1){
                item.count = 1
            }else{
                item.price = item.price - item.price/item.count;
                item.count--
            }
        },
        removeItem(state, {payload}){
            const idx = state.cart.findIndex(item=> item.id === payload)
            state.cart.splice(idx, 1)
        },
        removeAll(state){
            state.cart = []
        }
    }
})

export const selectCart = state => state.cart

export const {addToCart, incrementCount, decrementCount, removeItem, removeAll, setCart,delCart} = cartSlice.actions

export const cartReducer = cartSlice.reducer