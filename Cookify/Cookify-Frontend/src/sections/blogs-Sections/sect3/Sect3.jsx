import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    addComment,
    deleteComment,
    fetchBlogs,
    toggleLike,
} from "../../../redux/reducers/blogReducer.js";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const Sect3 = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { items: blogs, loading } = useSelector((state) => state.blog);
    const user = useSelector((state) => state.user.user);

    const getId = (u) => {
        if (!u) return null;
        return typeof u === "string" ? u : u._id || u.id;
    };

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    const handleLike = (blogId) => {
        if (!user) return navigate("/auth/signup");
        dispatch(toggleLike(blogId));
    };

    const handleCommentSubmit = (e, blogId, textRef) => {
        e.preventDefault();
        if (!user) return navigate("/auth/signup");
        const commentText = textRef.current.value.trim();
        if (!commentText) return;

        dispatch(
            addComment({
                id: blogId,
                commentData: { text: commentText, id: user._id },
            })
        );
        textRef.current.value = "";
    };

    const handleDeleteComment = (blogId, comment) => {
        if (!user) return;

        const blog = blogs.find((b) => b._id === blogId);
        const blogAuthorId = getId(blog?.author);
        const currentUserId = getId(user);

        const isAuthor = blogAuthorId === currentUserId;
        const isOwner = comment?.user
            ? getId(comment.user) === currentUserId
            : comment?.username === user.username;

        const isAdmin = user?.role === "admin";

        console.log("✅ blogAuthorId:", blogAuthorId);
        console.log("✅ currentUserId:", currentUserId);
        console.log("✅ isAuthor:", isAuthor, "| isOwner:", isOwner);

        if (isOwner || isAuthor || isAdmin) {
            dispatch(deleteComment({ blogId, commentId: comment._id }));
        }
    };





    if (loading) return <div className="text-center">Yüklənir...</div>;

    return (
        <div className="container py-4 rounded overflow-hidden">
            <div className="row g-4 rounded">
                {blogs.map((blog) => {
                    const isLiked = user && blog.likes.includes(user.id);
                    const commentInput = React.createRef();
                    return (
                        <div key={blog._id} className="col-12 rounded-4">
                            <div className="card shadow-lg rounded-4 overflow-hidden animate__animated animate__fadeIn">
                                <div className="card-body bg-success text-light">
                                    <h5 className="card-title mb-3">
                                        {blog.author?.username || "Anonim"}
                                    </h5>

                                    {blog.imageUrl && (
                                        <img
                                            className="img-fluid mb-3"
                                            src={`http://localhost:3000${blog.imageUrl}`}
                                            alt={blog.title}
                                        />
                                    )}

                                    <p
                                        className="p-3 rounded bg-light text-success"
                                        style={{
                                            fontFamily: "Poppins, sans-serif",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {blog.content}
                                    </p>

                                    <button
                                        className="btn btn-light d-inline-flex align-items-center gap-1"
                                        onClick={() => handleLike(blog._id)}
                                    >
                                        {isLiked ? (
                                            <AiFillHeart style={{ color: "red", fontSize: "20px" }} />
                                        ) : (
                                            <AiOutlineHeart style={{ fontSize: "20px" }} />
                                        )}
                                        {blog.likes.length}
                                    </button>

                                    {/* Şərhlər */}
                                    <div className="bg-light rounded-4 p-3 mt-3">
                                        <h6 className="text-success mb-2">Şərhlər:</h6>
                                        {blog.comments?.map((comment) => {
                                            const currentUserId = getId(user);
                                            const blogAuthorId = getId(blog?.author); // sadəcə string ola bilər

                                            const isOwner = comment?.user
                                                ? getId(comment.user) === currentUserId
                                                : comment?.username === user.username;

                                            const isAuthor = blogAuthorId === currentUserId;
                                            const isAdmin = user?.role === "admin";

                                            const canDelete = isOwner || isAuthor || isAdmin;

                                            return (
                                                <div
                                                    key={comment._id}
                                                    className="d-flex justify-content-between align-items-center border rounded-3 p-2 mb-2 bg-success text-light animate__animated animate__fadeInUp"
                                                >
            <span>
                <strong>{comment.username}:</strong> {comment.text}
            </span>
                                                    {canDelete && (
                                                        <button
                                                            onClick={() => handleDeleteComment(blog._id, comment)}
                                                            className="btn btn-danger btn-sm"
                                                        >
                                                            ❌
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })}

                                        <form
                                            onSubmit={(e) => handleCommentSubmit(e, blog._id, commentInput)}
                                            className="input-group mt-3"
                                        >
                                            <input
                                                ref={commentInput}
                                                type="text"
                                                className="form-control"
                                                placeholder="Şərh yaz..."
                                            />
                                            <button type="submit" className="btn btn-primary">
                                                Göndər
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    );
};

export default Sect3;
