import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const startDailyTask = createAsyncThunk(
    "dailyTask/start",
    async (_, { rejectWithValue }) => {
        try {
            const res = await fetch("http://localhost:3000/daily-task/start", {
                method: "POST",
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.message || "Error occurred");
            }
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);



export const submitDailyTask = createAsyncThunk(
    "dailyTask/submit",
    async ({ photo }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("photo", photo);

            const res = await fetch("http://localhost:3000/daily-task/submit", {
                method: "POST",
                credentials: "include",
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Xəta baş verdi");
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
const dailyTaskSlice = createSlice({
    name: "dailyTask",
    initialState: {
        currentTask: null,
        loading: false,
        error: null,
        submitted: false,
    },
    reducers: {
        resetSubmitted(state) {
            state.submitted = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(startDailyTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(startDailyTask.fulfilled, (state, action) => {
                state.loading = false;
                state.currentTask = action.payload.task || action.payload;
            })
            .addCase(startDailyTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(submitDailyTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitDailyTask.fulfilled, (state) => {
                state.loading = false;
                state.submitted = true;
            })
            .addCase(submitDailyTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetSubmitted } = dailyTaskSlice.actions;
export default dailyTaskSlice.reducer;