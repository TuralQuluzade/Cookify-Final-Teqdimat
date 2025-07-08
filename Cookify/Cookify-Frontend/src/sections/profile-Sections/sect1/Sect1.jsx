import React, {useEffect, useMemo, useState} from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
  MDBInput, MDBCardHeader
} from 'mdb-react-ui-kit';
// import axios from "axios";
// import Cookies from "js-cookie";
import api from "../../../utils/api.js";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {postLogoutThunk, updateProfileImageThunk} from "../../../redux/reducers/authReducer.js";
import CookifyBadge from "../../../components/badge/CookifyBadge.jsx";
import Cookies from "js-cookie";
import {fetchBlogs, fetchLikedBlogsByUser} from "../../../redux/reducers/blogReducer.js";
import BlogMiniCard from "./blogMinicard/BlogMiniCard.jsx";
// import {string} from "yup";
// const images=[
//   "../../.././assets/profile1.jpg",
//   "../../.././assets/profile2.jpg",
//   "../../.././assets/profile3.png",
//   "../../.././assets/profile4.jpg",
//   "../../.././assets/profile5.png",
//   "../../.././assets/profile6.jpg",
// ]
export default function Sect1() {
  const [profile, setProfile] = useState({
    username: "",
    fullName: "",
    email: "",
    profileImage: "",
    hasApprovedTask: false,
  });
  const [socialLinks, setSocialLinks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newLink, setNewLink] = useState({ name: "", url: "", icon: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { items: allBlogs, yuklenir,fetched } = useSelector((s) => s.blog);
  const { likedByUser } = useSelector(state => state.blog);
  const BASE_URL = "http://localhost:3000";
  const [showAll, setShowAll] = useState(false);
  const imgSrc = user?.profileImage
      ? `http://localhost:3000${user.profileImage}`
      : "/profile5.png";
  console.log("Şəkil URL:", user?.profileImage);
  const visiblePosts = showAll ? likedByUser : likedByUser.slice(0, 1);

  useEffect(() => {
    dispatch(fetchLikedBlogsByUser());
  }, [dispatch]);
  useEffect(() => {
    console.log("Liked blogs:", likedByUser);
  }, [likedByUser]);

  useEffect(() => {
    api.get("/me")
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.error("Profil alınmadı:", err));
  }, []);
  useEffect(() => {
    if (!user) return;
    api.get("/social")
        .then((res) => setSocialLinks(res.data))
        .catch((err) => console.error(err));
  }, [user]);


  const blogs = useMemo(() => {
    if (!fetched) dispatch(fetchBlogs());
    if (!user) return [];

    const myId = (user._id || user.id).toString();

    return allBlogs
        .filter((b) => {
          if (!b.author) return false;  // author yoxdursa burax
          const authorId = typeof b.author === "object"
              ? b.author._id?.toString()
              : b.author?.toString();
          return authorId === myId;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
  }, [allBlogs, user, fetched, dispatch]);


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      await dispatch(updateProfileImageThunk(file)).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await dispatch(postLogoutThunk()).unwrap();

      navigate("/auth/signup", { replace: true });
    } catch (err) {
      console.error("Logout xətası:", err);

    }
  };

  const handleAddLink = async () => {
    const { name, url } = newLink;
    if (!name || !url ) return alert("Bütün xanaları doldurun!");

    try {
      const { data: saved } = await api.post("/social", newLink);
      setSocialLinks((prev) => [...prev, saved]);
      setNewLink({ name: "", url: "", icon: "" });
      setShowForm(false);
    } catch (err) {
      console.error("Link əlavə olunmadı:", err);
    }
  };


  const handleDeleteLink = async (id) => {
    try {
      await api.delete(`/social/${id}`);
      setSocialLinks((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      console.error("Silinmə xətası:", err);
    }
  };




  return (
      <section style={{ backgroundImage: 'url("/food-pattern.svg")' ,backgroundColor:"#DFFFE0"}}>
        <MDBContainer  className="py-5">
          <MDBRow>
            {/*<MDBCol>*/}
            {/*  <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">*/}
            {/*    <MDBBreadcrumbItem>*/}
            {/*      <a href='#'>Home</a>*/}
            {/*    </MDBBreadcrumbItem>*/}
            {/*    <MDBBreadcrumbItem>*/}
            {/*      <a href="#">User</a>*/}
            {/*    </MDBBreadcrumbItem>*/}
            {/*    <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>*/}
            {/*  </MDBBreadcrumb>*/}
            {/*</MDBCol>*/}
          </MDBRow>

          <MDBRow>
            <MDBCol lg="4">
              <MDBCard style={{ backgroundColor: "#DFFFE0" }} className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                      src={imgSrc}
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/profile2.jpg";
                      }}
                      fluid
                  />
                  <div className="mt-3">
                    <MDBBtn
                        outline
                        style={{ borderColor: "#0F7229", color: "#0F7229" }}
                        className="w-75"
                        onClick={() => document.getElementById("profileImageInput").click()}
                    >
                      Şəkli Dəyiş
                    </MDBBtn>
                    <input
                        type="file"
                        accept="image/*"
                        id="profileImageInput"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                    />
                  </div>
                  <p style={{ fontWeight: "700", fontSize: "20px" }} className="text-muted mb-1">Cheff</p>
                  {profile.hasApprovedTask && <CookifyBadge text="Approved by Cookify" />}
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn
                        outline
                        style={{ borderColor: "#0F7229", color: "#0F7229" }}
                        onClick={handleLogout}
                        className="text-center w-50"
                    >
                      Logout
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>


              <MDBCard style={{ backgroundColor: "#DFFFE0" }} className="mb-4 mb-lg-0">
                <MDBCardBody style={{ backgroundColor: "#DFFFE0" }} className="p-0">
                  {socialLinks.length === 0 ? (
                      <div className="p-3 text-center">
                        <MDBCardText>Sosial Media Linkinizi bağlayın</MDBCardText>
                      </div>
                  ) : (
                      <MDBListGroup style={{ backgroundColor: "#DFFFE0" }} flush="true" className="rounded-3">
                        {socialLinks.map((link) => (
                            <MDBListGroupItem
                                key={link._id}
                                className="d-flex justify-content-between align-items-center p-3"
                                style={{ backgroundColor: "#DFFFE0" }}
                            >
                              <button
                                  onClick={() => handleDeleteLink(link._id)}
                                  className="btn btn-danger btn-sm"
                              >
                                Sil
                              </button>

                              <a
                                  href={link.url.startsWith("http") ? link.url : `https://${link.url}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-decoration-none"
                              >
                                <MDBCardText className="mb-0">
                                  <i className={`fab fa-${link.icon} me-2`} /> {link.name}
                                </MDBCardText>
                              </a>
                            </MDBListGroupItem>
                        ))}
                      </MDBListGroup>
                  )}

                  {/* --- “Əlavə et” düyməsi --- */}
                  <div className="p-3 text-center">
                    <MDBBtn style={{
                      backgroundColor: "#0F7229",
                      color:"#DFFFE0"
                    }} onClick={() => setShowForm(!showForm)}>
                      <MDBIcon fas icon="plus" /> Əlavə et
                    </MDBBtn>
                  </div>

                  {/* --- Form --- */}
                  {showForm && (
                      <div className="p-3">
                        <MDBInput
                            label="Sosial Media Adı (məs: Facebook)"
                            value={newLink.name}
                            onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                            className="mb-3"
                        />
                        <MDBInput
                            label="Link (https://...)"
                            value={newLink.url}
                            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                            className="mb-3"
                        />
                        {/*<MDBInput*/}
                        {/*    label="Icon (məs: facebook, instagram, twitter)"*/}
                        {/*    value={newLink.icon}*/}
                        {/*    onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}*/}
                        {/*    className="mb-3"*/}
                        {/*/>*/}
                        <MDBBtn style={{
                          backgroundColor: "#0F7229",
                          color:"#DFFFE0"
                        }} color="success" onClick={handleAddLink}>
                          Yadda saxla
                        </MDBBtn>
                      </div>
                  )}
                </MDBCardBody>
              </MDBCard>



            </MDBCol >
            <MDBCol  lg="8">
              <MDBCard style={{ backgroundColor: "#DFFFE0" }} className="mb-4">
                <MDBCardHeader className="text-center fw-bold fs-4">
                  İstifadəçi Məlumatları
                </MDBCardHeader>
                <MDBCardBody>
                  {/* Username */}
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Username</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {profile.username || "—"}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />

                  {/* Full name */}
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {profile.fullName || "—"}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />

                  {/* Email */}
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">
                        {profile.email || "—"}
                      </MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>


              <MDBRow>
                <MDBCol md="6">
                  <MDBCard style={{ backgroundColor: "#DFFFE0" }} className="mb-4 mb-md-0">
                    <MDBCardBody>
                      <MDBCardText className="mb-4">
                        <span className="text-primary font-italic me-1">Son</span> Blog Yazıları
                      </MDBCardText>

                      {yuklenir && !fetched ? (
                          <MDBCardText className="text-muted">Yüklənir…</MDBCardText>
                      ) : !yuklenir && fetched && blogs.length === 0 ? (
                          <MDBCardText className="text-muted">Hələ blog paylaşmamısınız.</MDBCardText>
                      ) : (
                          blogs.map((blog) => (
                              <BlogMiniCard
                                  key={blog._id}
                                  blog={blog}
                                  onOpen={() => navigate(`/blog/${blog._id}`)}
                              />
                          ))
                      )}
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

                <MDBCol md="6">
                  <MDBCard style={{ backgroundColor: "#DFFFE0" }} className="mb-4 mb-md-0 shadow-3 rounded-6">
                    <MDBCardBody>
                      <MDBCardText className="mb-4">
                        <span className="text-success font-italic me-1">Bəyəndiyin Postlar</span>
                      </MDBCardText>

                      {visiblePosts.map((blog) => (
                          <div key={blog._id} className="mb-4">
                            <MDBCardText className="fw-bold">{blog.content}</MDBCardText>
                            <hr/>
                            {blog.imageUrl && (
                                <img
                                    src={`${BASE_URL}${blog.imageUrl}`}
                                    alt={blog.title}
                                    style={{
                                      width: "100%",
                                      maxHeight: "200px",
                                      objectFit: "cover",
                                      borderRadius: "10px",
                                      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                    }}
                                />
                            )}
                          </div>
                      ))}

                      {likedByUser.length > 1 && (
                          <div className="text-center">
                            <MDBBtn
                                size="sm"
                                rounded
                                className="mt-2 px-4"
                                color="success"
                                onClick={() => setShowAll(!showAll)}
                            >
                              {showAll ? "Gizlət" : "Daha çox bax"}
                            </MDBBtn>
                          </div>
                      )}
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <style>
          {`
  .fade-in {
    animation: fadeIn 0.8s ease-in-out forwards;
    opacity: 0;
  }

  .zoom-hover:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 18px rgba(0, 182, 134, 0.35);
    transition: all 0.3s ease-in-out;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`}
        </style>
      </section>
  );
}