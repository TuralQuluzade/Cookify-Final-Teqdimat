import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = "http://localhost:3000";


const axiosConfig = {
    withCredentials: true,
};

// ────────────────────────────────────────────
//  Async thunk‑lar
// ────────────────────────────────────────────
export const fetchBlogs = createAsyncThunk("blogs/fetchAll", async (_, {rejectWithValue}) => {
    try {
        const res = await axios.get(`${BASE_URL}/blog`, axiosConfig);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const fetchBlogById = createAsyncThunk("blogs/fetchById", async (id, {rejectWithValue}) => {
    try {
        const res = await axios.get(`${BASE_URL}/blog/${id}`, axiosConfig);
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const createBlog = createAsyncThunk("blogs/create", async (blogData, {rejectWithValue}) => {
    try {
        const res = await axios.post(`${BASE_URL}/blog`, blogData, axiosConfig, {
            headers: {
                "Content-Type": "multipart/blog-data",
            }
        });
        return res.data;
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const toggleLike = createAsyncThunk("blogs/toggleLike", async (id, {rejectWithValue}) => {
    try {
        const res = await axios.put(`${BASE_URL}/blog/${id}/like`, {}, axiosConfig);
        return {id, likesCount: res.data.likes};
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message);
    }
});

export const addComment = createAsyncThunk(
    "blogs/addComment",
    async ({id, commentData}, {rejectWithValue}) => {
        try {
            const res = await axios.post(`${BASE_URL}/blog/${id}/comment`, commentData, axiosConfig);
            return {id, comment: res.data};
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);
// export const blockUserThunk = createAsyncThunk(
//     "blogs/blockUser",
//     async (userId, { rejectWithValue }) => {
//         try {
//             const res = await axios.put(`${BASE_URL}/admin/users/${userId}/block`, {}, axiosConfig);
//             return res.data; // bloklanmış user-i qaytarırsan
//         } catch (err) {
//             return rejectWithValue(err.response?.data?.message || err.message);
//         }
//     }
// )
export const deleteComment = createAsyncThunk(
    "blogs/deleteComment",
    async ({blogId, commentId}, {rejectWithValue}) => {
        try {
            await axios.delete(`${BASE_URL}/blog/${blogId}/comment/${commentId}`, axiosConfig);
            return {blogId, commentId};
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);
export const deleteBlogThunk = createAsyncThunk(
    "blogs/delete",
    async (id, {rejectWithValue}) => {
        try {
            await axios.delete(`${BASE_URL}/blog/${id}`, axiosConfig);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);
export const fetchLikedBlogsByUser = createAsyncThunk(
    "blogs/fetchLikedBlogsByUser",
    async (_, {rejectWithValue}) => {
        try {
            const res = await axios.get(`${BASE_URL}/liked-by-user`, axiosConfig);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// ────────────────────────────────────────────
//  Slice
// ────────────────────────────────────────────
const blogSlice = createSlice({
    name: "blogs",
    initialState: {
        items: [],
        selected: null,
        fetched: false,
        loading: false,
        error: null,
        likedByUser: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        // Fetch all
        builder
            .addCase(fetchBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
                state.fetched = true;
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.fetched = true;
            })

            // Fetch by id
            .addCase(fetchBlogById.fulfilled, (state, action) => {
                state.selected = action.payload;
            })

            // Create blog
            .addCase(createBlog.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })

            // Toggle like
            .addCase(toggleLike.fulfilled, (state, action) => {
                const {id, likesCount} = action.payload;
                const blog = state.items.find((b) => b._id === id);
                if (blog) blog.likes = Array(likesCount).fill("");
                if (state.selected?._id === id) state.selected.likes = Array(likesCount).fill("");
            })

            // Add comment
            .addCase(addComment.fulfilled, (state, action) => {
                const {id, comment} = action.payload;
                const blog = state.items.find((b) => b._id === id);
                if (blog) blog.comments.push(comment);
                if (state.selected?._id === id) state.selected.comments.push(comment);
            })

            // Delete comment
            .addCase(deleteComment.fulfilled, (state, action) => {
                const {blogId, commentId} = action.payload;
                const blog = state.items.find((b) => b._id === blogId);
                if (blog) blog.comments = blog.comments.filter((c) => c._id !== commentId);
                if (state.selected?._id === blogId) {
                    state.selected.comments = state.selected.comments.filter((c) => c._id !== commentId);
                }
            })
            //Delete Blog
            .addCase(deleteBlogThunk.fulfilled, (state, action) => {
                state.items = state.items.filter((b) => b._id !== action.payload);
                if (state.selected?._id === action.payload) state.selected = null;
            })
            .addCase(fetchLikedBlogsByUser.fulfilled, (state, action) => {
                state.loading = false;
                state.likedByUser = action.payload;
            });
    },
});

export default blogSlice.reducer;

