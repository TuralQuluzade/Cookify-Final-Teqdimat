import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentList from "./CommentList";
import { toast } from "react-toastify";
import {deleteBlogThunk, deleteComment, fetchBlogs} from "../../../redux/reducers/blogReducer.js";
import {toggleUserStatusThunk} from "../../../redux/reducers/authReducer.js";
import Sidebar from "../sidebar/Sidebar.jsx";

const CheckBlogs = () => {
    const dispatch = useDispatch();
    const blog = useSelector((state) => state.blog.items);
    const loading = useSelector((state) => state.blog.loading);
    // const user = useSelector((state) => state.user.user);
    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    const handleDeleteBlog = async (blogId) => {
        try {
            await dispatch(deleteBlogThunk(blogId)).unwrap();
            toast.success("Bloq silindi");
        } catch (err) {
            toast.error(`Bloq silinmədi: ${err}`);
        }
    };



    const handleBlockUser = (userId) => {
        dispatch(toggleUserStatusThunk(userId));
        toast.info("İstifadəçi bloklandı");
    };

    const handleDeleteComment = async (blogId, commentId) => {
        try {
            await dispatch(deleteComment({ blogId, commentId })).unwrap();
            toast.success("Şərh silindi");
        } catch (err) {
            toast.error(`Şərh silinmədi: ${err}`);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <Sidebar/>

                {/* Main content */}
                <div className="col-md-9 p-3" style={{ backgroundColor: "#A6FFA9", minHeight: "100vh" }}>
                    <h3 className="mb-4 p-2 rounded text-center" style={{ color: "#063B14", fontWeight: "bold" }}>
                        Blog İdarəetmə Paneli
                    </h3>
                    {loading ? (
                        <div>Yüklənir...</div>
                    ) : (
                        <div className="row g-4">
                            {blog.map((blog) => (
                                <div key={blog._id} className="col-md-6">
                                    <div
                                        className="card shadow-md"
                                        style={{
                                            border: "none",
                                            borderRadius: "1rem",
                                            transition: "transform 0.3s, box-shadow 0.3s",
                                            cursor: "pointer",
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.transform = "scale(1.02)";
                                            e.currentTarget.style.boxShadow = "0 0 10px rgba(0,0,0,0.2)";
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.transform = "scale(1)";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    >
                                        <div className="card-body">
                                            {blog.imageUrl && (
                                                <img
                                                    src={`http://localhost:3000${blog.imageUrl}`}
                                                    alt="blog şəkli"
                                                    className="img-fluid rounded mb-2"
                                                    style={{ maxHeight: "200px", objectFit: "cover" }}
                                                />
                                            )}
                                            <h5 className="card-title" style={{ color: "#063B14" }}>{blog.title}</h5>
                                            <p className="card-text text-dark">{blog.content.slice(0, 100)}...</p>
                                            <p className="text-muted">
                                                Yazan: {blog.author ? blog.author.username : "Istifadəçi Silinib"}
                                            </p>

                                            <div className="d-flex gap-2 mb-2">
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteBlog(blog._id)}
                                                >
                                                    Bloqu Sil
                                                </button>
                                                <button
                                                    className="btn btn-warning btn-sm"
                                                    onClick={() => handleBlockUser(blog.author?._id)}
                                                >
                                                    {blog.author?.status === "active" ? "Blokla" : "Aktiv et"}
                                                </button>
                                            </div>

                                            <CommentList
                                                comments={blog.comments}
                                                onDelete={(commentId) => handleDeleteComment(blog._id, commentId)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default CheckBlogs;
