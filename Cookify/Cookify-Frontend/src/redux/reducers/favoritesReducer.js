import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const toggleFavoriteThunk = createAsyncThunk(
    "favorites/toggleFavorite",
    async ({recipeId}, { rejectWithValue }) => {
        try {
            const res = await axios.post("http://localhost:3000/addfavorite", { recipeId }, {
                withCredentials: true,
            });
            return res.data.favorites;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Favorit əlavə/sil xətası");
        }
    }
);

export const getFavoritesThunk = createAsyncThunk(
    "favorites/getFavorites",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("http://localhost:3000/favorite", {
                withCredentials: true,
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Favoritləri gətirə bilmədim");
        }
    }
);

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(toggleFavoriteThunk.fulfilled, (state, action) => {
                const updatedIds = action.payload;
                state.items = state.items.filter(item => updatedIds.includes(item._id));
            })
            .addCase(getFavoritesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFavoritesThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(getFavoritesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default favoriteSlice.reducer;