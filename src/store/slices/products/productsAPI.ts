import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

 interface IElItem {
    id: string;
    title: string;
    price: number;
    images: string[];
    category:string;
    description:string;
}


export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async function({selectedCategory, setIsLoading}:{selectedCategory:string, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>}){
        const {data: productData} = await axios.get("https://dummyjson.com/products/")
        const {data: category} = await axios.get(`https://dummyjson.com/products/category/${selectedCategory}`) 
        let data;
    console.log(productData.products);
    console.log(selectedCategory);
    setIsLoading(false)
    if(selectedCategory === 'all'){
        // setIsLoading(false)
         data = productData.products.map((el:IElItem)=>({
            id: el.id.toString(),
            name: el.title,
            category: el.category,
            price: Math.round(el.price),
            description:el.description,
            imgUrl: el.images,
        }))
    }else{
        // setIsLoading(false)
         data = category.products.map((el:IElItem)=>({
            id: el.id.toString(),
            name: el.title,
            category: el.category,
            price: Math.round(el.price),
            description:el.description,
            imgUrl: el.images,
        }))
    }
    return data
    }
)