import { configureStore } from "@reduxjs/toolkit";
import { modalSlice } from "./modal";
import { serviceSlice } from "./services";

const store = configureStore({
    reducer:{
        modal: modalSlice.reducer,
        service: serviceSlice.reducer,
    }
})

export default store;