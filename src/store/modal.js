import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const modalSlice = createSlice({
    name:"modal",
    initialState:{modal:[false], button:[true]},
    reducers:{
        handleModal:(state, action)=>{
            state.modal = !state.modal
        },
        handleButtons:(state, action)=>{
            state.button = !state.button
        }
    }
  
})

export const modalActions = modalSlice.actions;