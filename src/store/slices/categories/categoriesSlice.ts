import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./categoriesAPI";
import { RootState } from "../../store";

interface ICategoriesState{
    categories:string[]
}

const initialState:ICategoriesState = {
    categories: []
}

const categoriesSlice = createSlice({
    name:'categories',
    initialState,
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
    extraReducers:(builder)=>{
        builder.addCase(fetchCategories.pending, ()=>{
            console.log('champina');
        }),
        builder.addCase(fetchCategories.fulfilled,(state, {payload})=>{
            return {
                ...state,
                categories:[...payload]
            }
        }),
        builder.addCase(fetchCategories.rejected, (err)=>{
            console.log('error', err);
        })
    }
})


export const selectCategories = (state:RootState) => state.categories

// export const {} = categoriesSlice.actions

export const categoriesReducer = categoriesSlice.reducer