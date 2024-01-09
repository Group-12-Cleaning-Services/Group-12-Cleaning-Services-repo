import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const modalSlice = createSlice({
    name:"modal",
    initialState:{
        modal:[false], 
        button:[true],
        profileModal:[true],
        updateModal:[false]
    },
    reducers:{
        handleModal:(state, action)=>{
            state.modal = !state.modal
        },
        handleButtons:(state, action)=>{
            state.button = !state.button
        },
        handleProfileModal:(state, action)=>{
            state.profileModal = !state.profileModal
        },
        handleUpdateModal:(state, action)=>{
            state.updateModal = !state.updateModal
        }
    }
  
})

export const modalActions = modalSlice.actions;