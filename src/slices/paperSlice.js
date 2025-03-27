import { createSlice } from "@reduxjs/toolkit";

const paperSlice=createSlice({
    name:"subject",
    initialState:{
        value:[]
    },
    reducers:{
        setSubject:(state,action)=>{
            state.value=action.payload
        },
        resetSubject:(state)=>{
            state.value="";
        }
    }
})

export const {setSubject,resetSubject}=paperSlice.actions

export default paperSlice.reducer