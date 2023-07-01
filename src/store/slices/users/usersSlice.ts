import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersAPI";
import { ICartItem } from "../cart/cartSlice";
import { RootState } from "../../store";

interface IUserCart {
    nr: string | null,
    user: ICartItem[]
}

interface IRegUserData{//nayel------
    firstName:string;
    email:string;
    password:string;
}
interface IUserData extends IRegUserData{
    id: string;
    // firstName:string;
    lastName:string;//anel aranc ?.
    // email:string;
    // password:string;
}
//-------------
interface IUserState {
    userName: string | null,
    usersData: (IUserData | IRegUserData)[],
    userCart: IUserCart[]
}

const initialState:IUserState = {
    userName: '',
    usersData: [],
    userCart: []
}

const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        setUsersData(state, {payload}:PayloadAction<IUserData |IRegUserData>){//<IUserData|IRegUserData>error ??
            state.usersData.push(payload)//resgister
        },
        setUserName(state, {payload}:PayloadAction<string|null>){
            state.userName = payload
        },
        setUserCart(state, {payload}:PayloadAction<IUserCart[]>){
            if(state.userName){
                return {
                    ...state,
                    userCart:[...payload]
                }
            }
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchUsers.pending, ()=>{
            console.log('champina');
        }),
        builder.addCase(fetchUsers.fulfilled,(state, {payload})=>{
            return {
                ...state,
                usersData:[...payload]
            }
        }),
        builder.addCase(fetchUsers.rejected,(err)=>{
            console.log('error', err);
        })
    }
})


export const selectUsers = (state: RootState) => state.users

export const {setUserName, setUsersData, setUserCart} = usersSlice.actions

export const usersReducer = usersSlice.reducer