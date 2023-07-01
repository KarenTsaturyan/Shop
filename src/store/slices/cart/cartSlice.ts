import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface ICartItem {
    id: string;
    name: string;
    price: number;
    imgUrl: string[];
    count:number;
}
type TypeAddToCart= Omit<ICartItem,'count'>

interface ICartState {
    cart:ICartItem[]
}

const initialState:ICartState = {
    cart: []
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers: {
        setCart(state, {payload}:PayloadAction<ICartItem[]>){
        //     return [///nuyn ___username ov array sarqum 
        //     ...payload
        //   ]
        if(payload){
            state.cart.push(...payload)
        }
        },
        delCart(state){
            state.cart = []
        },
        addToCart(state, {payload}:PayloadAction<TypeAddToCart | null>){
            const itemInCart = state.cart?.find((item)=>item.id === payload?.id);
            if(payload){
                if(itemInCart){
                    itemInCart.price = itemInCart.price + itemInCart.price / itemInCart.count;
                    itemInCart.count++;
                }else{
                    state.cart.push({...payload, count:1});
                }
            }
            // return [...state, {...payload}]
        },
        incrementCount(state, {payload}:PayloadAction<string>){
            const item = state.cart.find(item => item.id === payload);
            if (item) {
                item.price = item.price + item.price/item.count;
                item.count++;
            }
        },
        decrementCount(state, {payload}:PayloadAction<string>){
            const item = state.cart.find(item => item.id === payload);
            if (item) {
                if(item.count === 1){
                    item.count = 1
                }else{
                    item.price = item.price - item.price/item.count;
                    item.count--
                }
            }
        },
        removeItem(state, {payload}:PayloadAction<string>){
            const idx = state.cart.findIndex(item=> item.id === payload)
            state.cart.splice(idx, 1)
        },
        removeAll(state){
            state.cart = []
        }
    }
})

export const selectCart = (state:RootState) => state.cart

export const {addToCart, incrementCount, decrementCount, removeItem, removeAll, setCart,delCart} = cartSlice.actions

export const cartReducer = cartSlice.reducer