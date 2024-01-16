import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const modalSlice = createSlice({
    name:"modal",
    initialState:{
        modal:[false], 
        button:[true],
        profileModal:[true],
        updateModal:[false],
        updateId:[],
        serviceStatusModal:[false],
        moneyModal:[false],
        incomeModal:[false],
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
        },
        handleUpdateId:(state, action)=>{
            state.updateId = action.payload
        },
        handleServiceStatusModal:(state, action)=>{
            state.serviceStatusModal = !state.serviceStatusModal
        },
        handleMoneyModal:(state, action)=>{
            state.moneyModal = !state.moneyModal
        },
        handleIncomeModal:(state, action)=>{
            state.incomeModal = !state.incomeModal
        }
    }
  
})

export const modalActions = modalSlice.actions;