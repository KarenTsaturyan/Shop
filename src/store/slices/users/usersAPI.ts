import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

interface IUser{
    id: string;
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async function(){
        const {data} = await axios.get('https://dummyjson.com/users/')
        const users = data.users.map((el:IUser)=>({
            id: el.id.toString(),
            firstName:el.firstName,
            lastName:el.lastName,
            email:el.email,
            password:el.password
        }))
        console.log(users);
        return users
    }
)