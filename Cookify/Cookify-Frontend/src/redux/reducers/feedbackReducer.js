import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const getFeedbackThunk=createAsyncThunk("/feedback/get", async()=>{
    const res =await axios.get("http://localhost:3000/feedback");
    return res.data
})
export const postFeedbackThunk=createAsyncThunk("/feedback/post", async(data)=>{
    await axios.post("http://localhost:3000/feedback", data)
    return data;
})
export const deleteFeedbackThunk=createAsyncThunk("/feedback/delete", async(id)=>{
    await  axios.delete(`http://localhost:3000/feedback/${id}`)
    return id
})

const feedbackSlice=createSlice({
    name: 'feedback',
    initialState: {
        feedback:[],
        loading:false,
        errors:null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFeedbackThunk.pending, (state) => {
                state.loading = true
            })
            .addCase(getFeedbackThunk.fulfilled, (state,action) => {
                state.loading = false
                state.feedback = action.payload
            })
            .addCase(getFeedbackThunk.rejected, (state,action) => {
                state.loading = false
                state.error=action.error.message
            })
            .addCase(postFeedbackThunk.fulfilled, (state,action) => {
                state.loading = false
                state.feedback.push(action.payload)
            })
            .addCase(deleteFeedbackThunk.pending, (state) => {
                console.log("Delete pending...");
                state.loading = true;
            })
            .addCase(deleteFeedbackThunk.fulfilled, (state, action) => {
                console.log("Delete fulfilled", action.payload);
                state.loading = false;
                state.feedback = state.feedback.filter(fb => fb._id !== action.payload);
            })
            .addCase(deleteFeedbackThunk.rejected, (state, action) => {
                console.log("Delete rejected", action.error.message);
                state.loading = false;
                state.error = action.error.message;
            })
    }
})
export default feedbackSlice.reducer;