import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getComponentsThunk=createAsyncThunk("/components/get",async()=>{
    const res = await axios.get(`${BASE_URL}/components`)
    return res.data
})
export const postComponentsThunk=createAsyncThunk("/components/post",async(data)=>{
    await axios.post(`${BASE_URL}/components`,data)
    const res =await axios.get(`${BASE_URL}/components`)
    return res.data
})
export const deleteComponentsThunk=createAsyncThunk("/components/delete",async(id)=>{
    await axios.delete(`${BASE_URL}/components/${id}`)
    return id
})


const componentSlice=createSlice({
    name:"components",
    initialState:{
        components:[],
        loading:false,
        error:null
    },
    reducers:[],
    extraReducers: builder=>{
        builder
        .addCase(getComponentsThunk.pending,(state)=>{
            state.loading= true
        })
        .addCase(getComponentsThunk.fulfilled,(state,action)=>{
            state.loading=false
            state.components=action.payload
        })
        .addCase(getComponentsThunk.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
        .addCase(postComponentsThunk.fulfilled,(state,action)=>{
            state.loading=false
            state.components=action.payload
        })
        .addCase(deleteComponentsThunk.fulfilled,(state,action)=>{
            state.loading=false
            state.components=state.components.filter(x=>x._id!==action.payload)
        })
    }

})
export default componentSlice.reducer