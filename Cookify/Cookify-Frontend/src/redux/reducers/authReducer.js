    import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
    import axios from "axios";


    export const postLoginThunk = createAsyncThunk(
        "auth/login",
        async (data, { rejectWithValue }) => {
            try {
                const response = await axios.post("http://localhost:3000/auth/login", data,{
                    withCredentials: true
                });
                return response.data;
            } catch (err) {
                return rejectWithValue(err.response?.data || "Login xətası");
            }
        }
    );
    export const checkAuthThunk = createAsyncThunk("auth/check", async () => {
        const res = await axios.get("http://localhost:3000/me", {
            withCredentials: true,
        });
        return res.data;
    });



    export const postLogoutThunk = createAsyncThunk(
        "auth/logout",
        async (_, { rejectWithValue }) => {
            try {
                const response = await axios.post("http://localhost:3000/auth/logout",{},{
                    withCredentials: true
                });
                return response.data;
            } catch (err) {
                return rejectWithValue(err.response?.data || "Logout xətası");
            }
        }
    );
    export const updateProfileImageThunk = createAsyncThunk(
        "auth/updateProfileImage",
        async (file, { rejectWithValue }) => {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const res = await axios.put("http://localhost:3000/auth/profile-image", formData, {
                    withCredentials: true,
                });

                return res.data.profileImage; // serverdən gələn yeni url
            } catch (err) {
                return rejectWithValue("Şəkil dəyişmədi");
            }
        }
    );
    export const toggleUserStatusThunk = createAsyncThunk(
        "users/toggleStatus",
        async (id, { rejectWithValue }) => {
            try {
                const res = await axios.put(`http://localhost:3000/api/users/${id}/status`, {}, { withCredentials: true });
                return res.data;
            } catch (err) {
                return rejectWithValue(err.response?.data || "xəta");
            }
        }
    );

    export const postSignupThunk = createAsyncThunk(
        "auth/signup",
        async (data, { rejectWithValue }) => {
            try {
                const response = await axios.post("http://localhost:3000/auth/signup", data,{
                    withCredentials: true
                });
                return response.data;
            } catch (err) {
                return rejectWithValue(err.response?.data || "Signup xətası");
            }
        }
    );

    const authSlice = createSlice({
        name: "auth",
        initialState: {
            user: null,
            loading: false,
            errors: null,
        },
        reducers: {},
        extraReducers: (builder) => {
            builder

                .addCase(postLoginThunk.pending, (state) => {
                    state.loading = true;
                    state.errors = null;
                })
                .addCase(postLoginThunk.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload;
                    // localStorage.setItem("user", JSON.stringify(action.payload.user));
                })
                .addCase(postLoginThunk.rejected, (state, action) => {
                    state.loading = false;
                    state.errors = action.payload;
                })

                .addCase(postLogoutThunk.pending, (state) => {
                    state.loading = true;
                    state.errors = null;
                })
                .addCase(postLogoutThunk.fulfilled, (state) => {
                    state.loading = false;
                    state.user = null;
                })
                .addCase(postLogoutThunk.rejected, (state, action) => {
                    state.loading = false;
                    state.errors = action.payload;
                })

                .addCase(postSignupThunk.pending, (state) => {
                    state.loading = true;
                    state.errors = null;
                })
                .addCase(postSignupThunk.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload;
                    // localStorage.setItem("user", JSON.stringify(action.payload));
                })
                .addCase(postSignupThunk.rejected, (state, action) => {
                    state.loading = false;
                    state.errors = action.payload;
                })
                .addCase(checkAuthThunk.pending, (state) => {
                    state.loading = true;
                    state.errors = null;
            })
                .addCase(checkAuthThunk.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload
                    state.userChecked=true
                })
                .addCase(checkAuthThunk.rejected, (state, action) => {
                    state.loading = false;
                    state.user = null;
                    state.userChecked=true
                    state.error = action.error.message;
                })
                .addCase(updateProfileImageThunk.fulfilled, (state, action) => {
                    if (state.user) {
                        state.user.profileImage = action.payload;
                    }
                })
                .addCase(toggleUserStatusThunk.fulfilled, (state, action) => {
                    const updatedUser = action.payload;
                    const existing = state.user.find((u) => u._id === updatedUser._id);
                    if (existing) {
                        existing.status = updatedUser.status;
                    }
                })
        },
    });

    export default authSlice.reducer;
