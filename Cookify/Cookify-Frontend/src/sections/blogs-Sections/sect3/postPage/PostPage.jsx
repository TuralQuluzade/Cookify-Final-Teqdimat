// PostPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { useParams, useNavigate } from "react-router-dom";
import Sect3 from "../Sect3.jsx";
import {fetchBlogById} from "../../../../redux/reducers/blogReducer.js";

const PostPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selected: blog, loading, error } = useSelector((state) => state.blogs);

    useEffect(() => {
        if (id) {
            dispatch(fetchBlogById(id));
        }
    }, [dispatch, id]);

    if (loading) return <div>Yüklənir...</div>;

    if (error) return <div>Xəta baş verdi: {error}</div>;

    if (!blog) return <div>Blog tapılmadı</div>;

    return <Sect3 blog={blog} navigate={navigate} />;
};

export default PostPage;
