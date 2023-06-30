import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./categoriesAPI";


const categoriesSlice = createSlice({
    name:'categories',
    initialState: {
        categories: [],
    },
    reducers:{
        // findElem(state, {payload}){
        //     // const idx = state.findIndex(product=> product.id === payload)
        //     const initialProduct = state.allProducts.find(item => item.id === payload)
        //     state.currentProduct = initialProduct
        // },
        // setSelectedCategory(state, {payload}){
        //     state.selectedCategory = payload
        // }
    },
    extraReducers:{
        [fetchCategories.pending]: ()=>{
            console.log('champina');
        },
        [fetchCategories.fulfilled]:(state, {payload})=>{
            return {
                ...state,
                categories:[...payload]
            }
        },
        [fetchCategories.rejected]: (err)=>{
            console.log('error', err);
        }
    }
})


export const selectCategories = state => state.categories

export const {} = categoriesSlice.actions

export const categoriesReducer = categoriesSlice.reducer