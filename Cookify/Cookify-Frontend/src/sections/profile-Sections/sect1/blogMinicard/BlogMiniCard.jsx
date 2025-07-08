import React from "react";
import {
    MDBRow,
    MDBCol,
    MDBCardImage,
    MDBCardText,
    MDBBtn,
} from "mdb-react-ui-kit";
import styles from "./BlogMiniCard.module.scss";

const truncate = (str = "", maxLen = 100) =>
    str.length <= maxLen ? str : str.slice(0, maxLen) + "…";

const BlogMiniCard = ({ blog, onOpen }) => {
    return (
        <MDBRow className={`${styles.item} g-2`}>
            {/* Thumbnail */}
            <MDBCol size="4" md="3">
                {blog.imageUrl ? (
                    <MDBCardImage
                        src={`http://localhost:3000${blog.imageUrl}`}
                        alt={blog.title}
                        className="img-fluid rounded"
                    />
                ) : (
                    <div className={styles.placeholder}>No Image</div>
                )}
            </MDBCol>

            {/* Text */}
            <MDBCol size="8" md="6" className="d-flex flex-column">
                <h6 className="mb-1">{blog.title}</h6>
                <MDBCardText className="mb-1 text-muted" style={{ fontSize: "0.85rem" }}>
                    {truncate(blog.content, 90)}
                </MDBCardText>
                <small className="text-muted">
                    {new Date(blog.createdAt).toLocaleDateString()}
                </small>
            </MDBCol>

            {/* Button */}
            <MDBCol md="3" className="d-flex align-items-center justify-content-end">
                <MDBBtn size="sm" outline color="primary" onClick={onOpen}>
                    Bax
                </MDBBtn>
            </MDBCol>
        </MDBRow>
    );
};

export default BlogMiniCard;
