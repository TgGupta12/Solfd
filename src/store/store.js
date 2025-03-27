import { configureStore } from "@reduxjs/toolkit";
import paperReducer from "../slices/paperSlice"
const store=configureStore({
    reducer:{
        subject:paperReducer
    }
})

export default store