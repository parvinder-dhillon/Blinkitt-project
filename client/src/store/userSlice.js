 import { createSlice } from "@reduxjs/toolkit";

 const initialValue ={
     _id :"",
    name :"",
    email :"",
    mobile:"",
    avatar:"",
    verify_email:"",
    last_login_date:"",
    status:"",
    address_details:[],
    orderHistory: [],
    shopping_cart: [],
    role:""
 }


 const userSlice = createSlice({
    name :'user',
    initialState:initialValue,
    reducers:{
        setUserDetails:(state,action)=>{
            state._id =action.payload?._id
            state.name =action.payload?.name
            state.email =action.payload?.email
            state.mobile =action.payload?.mobile
            state.avatar =action.avatar
            state.last_login_date =action.payload?.last_login_date
            state.verify_email =action.payload?.verify_email
            state.shopping_cart =action.payload?.shopping_cart
            state.orderHistory =action.payload?.orderHistory
            state.role =action.payload?.role
            state.status =action.payload?.status
            state.address_details =action.payload?.address_details
        },
        logout :(state,action)=>{
            state._id =""
            state.name =""
            state.email =""
            state.mobile =""
            state.avatar =""
            state.last_login_date =""
            state.verify_email =""
            state.shopping_cart =[]
            state.orderHistory =[]
            state.role =""
            state.status =""
            state.address_details =[]
        }
    }
 })

export const {setUserDetails, logout} = userSlice.actions


export default userSlice.reducer