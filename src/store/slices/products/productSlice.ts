import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts } from "./productsAPI";
import { RootState } from "../../store";

export interface IProductItem {
    id: string;
    name: string;
    price: number;
    imgUrl: string[];
    category:string;
    description:string;
}
// type TypeAddToCart= Omit<ICartItem,'count'>

interface IProductsState {
    // cart:ICartItem[]
    currentProduct:IProductItem | null,
    allProducts: IProductItem[],
    selectedCategory: string,
}

const initialState:IProductsState = {
    currentProduct: null,
    allProducts: [],
    selectedCategory: 'all',
}

const productsSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        findElem(state, {payload}:PayloadAction<string|undefined>){
            // const idx = state.findIndex(product=> product.id === payload)
            const initialProduct = state.allProducts.find(item => item.id === payload)
            state.currentProduct = initialProduct as (IProductItem)
        },
        setSelectedCategory(state, {payload}){
            state.selectedCategory = payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending, ()=>{
            console.log('on its way');
        }),
        builder.addCase(fetchProducts.fulfilled,(state, {payload})=>{
            return {
                ...state,
                allProducts:[...payload]
            }
        }),
        builder.addCase(fetchProducts.rejected, ()=>{
            console.log('error');
        })
    }
})


export const selectProducts = (state:RootState) => state.products

export const {findElem, setSelectedCategory} = productsSlice.actions

export const productsReducer = productsSlice.reducer