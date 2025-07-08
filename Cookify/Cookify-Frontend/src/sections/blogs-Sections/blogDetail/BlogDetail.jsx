import React, { useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import {deleteBlogThunk, fetchBlogById} from "../../../redux/reducers/blogReducer.js";
import { toast } from "react-toastify";
import {MDBBtn} from "mdb-react-ui-kit";
import {checkAuthThunk} from "../../../redux/reducers/authReducer.js";
const BlogDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const blog = useSelector((state) => state.blog.selected);
    const user   = useSelector((s) => s.user.user);
    const loading = useSelector((state) => state.blog.loading);

    useEffect(() => {
        if (id) dispatch(fetchBlogById(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (user && blog) {
            const authorId = typeof blog.author === "string"
                ? blog.author
                : blog.author?._id;

            console.log("userId:", user.id);
            console.log("authorId:", authorId);
        }
    }, [user, blog]);
    const isOwner = user && blog && (blog.author?._id || blog.author) === user.id;
    const handleDelete = async () => {
        if (!window.confirm("Bloqu silmək istədiyinizə əminsiniz?")) return;

        try {
            await dispatch(deleteBlogThunk(id)).unwrap();
            toast.success("Blog silindi");
            navigate("/profile");      // və ya "/"
        } catch (err) {
            toast.error(err || "Silinmədi");
        }
    };
    if (loading)
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-success" role="status" aria-hidden="true"></div>
                <span className="ms-2">Yüklənir...</span>
            </div>
        );

    if (!blog)
        return (
            <div className="alert alert-warning text-center" role="alert">
                Blog tapılmadı.
            </div>
        );

    return (
        <div className="container my-5">
            <div className="card shadow-lg">
                <img
                    src={`http://localhost:3000${blog.imageUrl}`}
                        className="card-img-top img-fluid"
                        alt={blog.title}
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                        <div className="card-body">
                        <h2 className="card-title">{blog.title}</h2>
            <p className="card-text">{blog.content}</p>
                            {isOwner && (
                                <MDBBtn color="danger" onClick={handleDelete}>
                                    Sil
                                </MDBBtn>
                            )}
            <hr />
            <p className="text-muted">
                <strong>Yazar:</strong> {blog.author?.username || "Bilinmir"}
            </p>
        </div>
</div>
</div>
);
};

export default BlogDetail;