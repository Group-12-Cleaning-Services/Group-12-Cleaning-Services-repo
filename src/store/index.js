import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./modal";

const store = configureStore({
    reducer:{
        modal: modalSlice.reducer,
    }
})

export default store;