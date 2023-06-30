import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async function(){
        const {data} = await axios.get('https://dummyjson.com/users/')
        console.log(data.users);
        return data.users
    }
)