import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const  getSupportThunk=createAsyncThunk("/supporter/get",async()=>{
    const  res=await axios.get(`http://localhost:3000/supporter/`);
    return res.data;
})
export const postSupportThunk=createAsyncThunk("/supporter/post",async(data)=>{
    await  axios.post("http://localhost:3000/supporter/",data)
    return data;
})
export const deleteSupportThunk=createAsyncThunk("/supporter/delete",async(id)=>{
    await axios.delete(`http://localhost:3000/supporter/${id}`);
    return id
})

const  supporterSlice=createSlice({
    name: 'supporter',
    initialState: {
        supporter:[],
        loading:false,
        error:null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSupportThunk.pending,(state)=>{
                state.loading = true;
            })
            .addCase(getSupportThunk.fulfilled,(state,action)=>{
                state.loading = false;
                state.supporter = action.payload;
            })
            .addCase(getSupportThunk.rejected,(state,action)=>{
                state.loading = false;
                state.error=action.error.message
            })
            .addCase(postSupportThunk.fulfilled,(state,action)=>{
                state.loading = false;
                state.supporter.push(action.payload);
            })
            .addCase(deleteSupportThunk.fulfilled,(state,action)=>{
                state.loading = false;
                state.supporter=state.supporter.filter( x => x._id !== action.payload)
            })
    }
})
export default supporterSlice.reducer