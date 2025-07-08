import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiCamera } from "react-icons/fi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../../../redux/reducers/blogReducer.js";
import { getComponentsThunk } from "../../../redux/reducers/componentsReducer.js";
import * as Yup from "yup";

const Sect2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.user.user);
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selected, setSelected] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef(null);

  const data = useSelector((state) => state.components.components);
  const loading = useSelector((state) => state.components.loading);

  useEffect(() => {
    if (previewUrl) return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  useEffect(() => {
    dispatch(getComponentsThunk());
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    e.target.value = "";
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSelect = (item) => {
    if (!selected.some((el) => el._id === item._id)) {
      setSelected((prev) => [...prev, item]);
    }
  };

  const handleRemove = (id) => {
    setSelected((prev) => prev.filter((el) => el._id !== id));
  };

  const handleSubmit = async () => {
    setIsSending(true);
    const schema = Yup.object().shape({
      content: Yup.string().required("Mətn boş ola bilməz"),
      image: Yup.mixed().required("Şəkil yüklənməyib"),
    });
    if (!user) {
      navigate("/auth/signup", {
        replace: true,
        state: {
          toast: { type: "info", msg: "Post paylaşmaq üçün əvvəlcə daxil olun!" },
        },
      });
      setIsSending(false);
      return;
    }
    try {
      await schema.validate({ content, image }, { abortEarly: false });
      const blogData = new FormData();
      blogData.append("title", "Post");
      blogData.append("content", content);
      blogData.append("ingredients", JSON.stringify(selected.map((i) => i.name)));
      blogData.append("image", image);

      dispatch(createBlog(blogData));
      toast.success("Post uğurla göndərildi");
      setContent("");
      setImage(null);
      setPreviewUrl(null);
      setSelected([]);
      handleRemoveImage();
    } catch (err) {
      if (err.inner) {
        err.inner.forEach((e) => toast.error(e.message));
      } else {
        toast.error("Xəta baş verdi");
      }
    }
    setIsSending(false);
    window.location.reload();
  };

  if (loading) return <div className="text-center">Yüklənir...</div>;

  return (
      <div className="container py-5">
        <div className="card shadow-lg rounded-4 bg-success text-light">
          <div className="card-body">
            {/* Yazılan */}
            <div className="d-flex align-items-center gap-3 mb-3 p-2 shadow-sm rounded bg-white ">
              {/* Kamera düyməsi */}
              <label
                  className="btn btn-outline-success d-flex align-items-center justify-content-center"
                  style={{
                    width: "60px",
                    height: "50px",
                    borderRadius: "50%",
                    padding: 0,
                    backgroundColor: "#DFFFE0"
                  }}
              >
                <FiCamera size={30} />
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                />
              </label>

              {/* Input sahəsi */}
              <input
                  type="text"
                  placeholder="🪄 Bir yemək paylaş..."
                  className="form-control border-0 shadow-none px-3 py-2"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{
                    backgroundColor: "#f8f9fa",
                    borderRadius: "30px",
                    fontSize: "0.95rem",
                    outline: "none",
                  }}
              />


              {/* Göndər düyməsi */}
              <button
                  className="btn btn-success px-4 py-2 rounded-pill"
                  onClick={handleSubmit}
                  disabled={isSending}
              >
                {isSending ? (
                    <span
                        className="spinner-border spinner-border-sm text-light"
                        role="status"
                    ></span>
                ) : (
                    "Göndər"
                )}
              </button>
            </div>

            {/* Image preview */}
            {previewUrl && (
                <div className="position-relative mt-3">
                  <img
                      src={previewUrl}
                      className="img-fluid rounded-3 shadow"
                      style={{ transition: "opacity 0.5s" }}
                      alt="preview"
                  />
                  <button
                      className="btn btn-danger position-absolute top-0 end-0 m-2"
                      onClick={handleRemoveImage}
                  >
                    &times;
                  </button>
                </div>
            )}

            {/* Seçilənlər və komponentlər */}
            {previewUrl && (
                <div className="bg-light text-dark rounded-4 p-3 mt-3">
                  <h5 className="text-center mb-3">Seçilənlər</h5>

                  {selected.length > 0 && (
                      <div className="d-flex flex-wrap gap-2 mb-3 justify-content-center">
                        {selected.map((el) => (
                            <span
                                className="badge bg-success rounded-pill px-3 py-2 d-flex align-items-center gap-2"
                                key={el._id}
                            >
                      {el.name}
                              <button
                                  onClick={() => handleRemove(el._id)}
                                  className="btn-close btn-close-white btn-sm"
                              ></button>
                    </span>
                        ))}
                      </div>
                  )}

                  <div className="row g-2">
                    {data.map((item) => (
                        <div className="col-6 col-md-4 col-lg-3" key={item._id}>
                          <div className="card bg-success text-light shadow-sm">
                            <div className="card-body p-2 d-flex justify-content-between align-items-center">
                              <span>{item.name}</span>
                              <button
                                  className="btn btn-light btn-sm"
                                  onClick={() => handleSelect(item)}
                              >
                                ✔
                              </button>
                            </div>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default Sect2;

