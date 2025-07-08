import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getReceptThunk=createAsyncThunk("/recept/get",async ()=>{
    const res= await axios.get("http://localhost:3000/recepts")
    return res.data;
})
export const  postReceptThunk=createAsyncThunk("/recept/post",async (data)=>{
    await axios.post("http://localhost:3000/recepts",data)
    const res= await axios.get("http://localhost:3000/recepts")
    return res.data;
})
export const  deleteReceptThunk=createAsyncThunk("/recept/delete",async (id)=>{
    await   axios.delete(`http://localhost:3000/recepts/${id}`)
    return id
})
export const updateReceptThunk = createAsyncThunk(
    "/recept/update",
    async ({ id, data }) => {
        const res = await axios.put(`http://localhost:3000/recepts/${id}`, data);
        return res.data;
    }
);

const  receptSlice=createSlice({
    name: 'recepts',
    initialState: {
        recepts:[],
        loading:true,
        errors:null
    },
    reducers: {},
    extraReducers:builder => {
        builder
            .addCase(getReceptThunk.pending, (state) => {
                state.loading=true
            })
            .addCase(getReceptThunk.fulfilled, (state, action) => {
                state.loading=false
                state.recepts=action.payload
            })
            .addCase(getReceptThunk.rejected, (state, action) => {
                state.loading=false
                state.error=action.error.message
            })
            .addCase(postReceptThunk.fulfilled, (state, action) => {
                state.loading=false
                state.recepts=action.payload
            })
            .addCase(deleteReceptThunk.fulfilled, (state, action) => {
                state.loading=false
                state.recepts = state.recepts.filter(x => x._id !== action.payload)
            })
            .addCase(updateReceptThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.recepts = state.recepts.map(item =>
                    item._id === action.payload._id ? action.payload : item
                );
            })
            .addCase(updateReceptThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateReceptThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
})
export  default receptSlice.reducer