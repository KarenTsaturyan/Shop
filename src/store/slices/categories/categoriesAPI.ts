import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async function(){
        const {data} = await axios.get('https://dummyjson.com/products/categories/')
        console.log(data);
        return data
    }
)