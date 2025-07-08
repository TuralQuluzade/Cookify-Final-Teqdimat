import {configureStore} from "@reduxjs/toolkit";
import receptSlice from "./reducers/receptsReducer.js";
import favoriteSlice from "./reducers/favoritesReducer.js";
import authSlice from "./reducers/authReducer.js";
import blogSlice from "./reducers/blogReducer.js";
import componentSlice from "./reducers/componentsReducer.js";
import feedbackSlice from "./reducers/feedbackReducer.js";
import supporterSlice from "./reducers/supporterReducer.js";
import dailyTaskReducer from "./reducers/dailyTaskReducer.js";

export  const  store = configureStore({
    reducer: {
        recepts:receptSlice,
        favorites:favoriteSlice,
        user:authSlice,
        blog:blogSlice,
        components:componentSlice,
        feedback:feedbackSlice,
        supporter:supporterSlice,
        dailyTask: dailyTaskReducer,
    }
})