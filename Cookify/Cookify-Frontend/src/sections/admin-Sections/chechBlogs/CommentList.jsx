import React from "react";

const CommentList = ({ comments, onDelete }) => {
    if (!comments || comments.length === 0) {
        return <small className="text-muted">Şərh yoxdur.</small>;
    }
    return (
        <div className="mt-3">
            <h6 style={{ color: "#063B14" }}>Şərhlər</h6>
            <ul className="list-group">
                {comments.map((comment) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center" key={comment._id}>
                        <span>{comment.text}</span>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => onDelete(comment._id)}
                        >
                            Sil
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;
