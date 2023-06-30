import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productsAPI";


const productsSlice = createSlice({
    name:'products',
    initialState: {
        currentProduct:null,
        allProducts: [],
        selectedCategory: 'all',
    },
    reducers:{
        findElem(state, {payload}){
            // const idx = state.findIndex(product=> product.id === payload)
            const initialProduct = state.allProducts.find(item => item.id === payload)
            state.currentProduct = initialProduct
        },
        setSelectedCategory(state, {payload}){
            state.selectedCategory = payload
        }
    },
    extraReducers:{
        [fetchProducts.pending]: ()=>{
            console.log('on its way');
        },
        [fetchProducts.fulfilled]:(state, {payload})=>{
            return {
                ...state,
                allProducts:[...payload]
            }
        },
        [fetchProducts.rejected]: (err)=>{
            console.log('error', err);
        }
    }
})


export const selectProducts = state => state.products

export const {findElem, setSelectedCategory} = productsSlice.actions

export const productsReducer = productsSlice.reducer