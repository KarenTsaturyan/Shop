import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersAPI";


const usersSlice = createSlice({
    name:'users',
    initialState: {
        userName: '',
        usersData: [],
        userCart: []
    },
    reducers:{
        setUsersData(state, {payload}){
            state.usersData.push(payload)//resgister
        },
        setUserName(state, {payload}){
            state.userName = payload
        },
        setUserCart(state, {payload}){
            return {
                ...state,
                userCart:[...payload]
            }
        }
    },
    extraReducers:{
        [fetchUsers.pending]: ()=>{
            console.log('champina');
        },
        [fetchUsers.fulfilled]:(state, {payload})=>{
            return {
                ...state,
                usersData:[...payload]
            }
        },
        [fetchUsers.rejected]: (err)=>{
            console.log('error', err);
        }
    }
})


export const selectUsers = state => state.users

export const {setUserName, setUsersData, setUserCart} = usersSlice.actions

export const usersReducer = usersSlice.reducer