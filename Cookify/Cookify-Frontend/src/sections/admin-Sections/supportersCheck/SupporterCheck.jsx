import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaTrash } from "react-icons/fa";
import AddSupporterModal from "./AddSupporterModal";
import {deleteSupportThunk, getSupportThunk, postSupportThunk} from "../../../redux/reducers/supporterReducer.js";
import Sidebar from "../sidebar/Sidebar.jsx";


const SponsorAdmin = () => {
    const dispatch = useDispatch();
    const supporters = useSelector((state) => state.supporter.supporter);
    const loading = useSelector((state) => state.supporter.loading);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getSupportThunk());
    }, [dispatch]);

    const handleAdd = (data) => {
        dispatch(postSupportThunk(data));
    };

    const handleDelete = (id) => {
        if (window.confirm("Bu desteği silmek istediğinizden emin misiniz?")) {
            dispatch(deleteSupportThunk(id));
        }
    };

    return (
        <div className="container-fluid" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
            <div className="row">
                {/* Sidebar buraya yerləşdirilə bilər */}
                <Sidebar />

                {/* Main content */}
                <main className="col-md-9 col-lg-10 p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4 p-3 bg-info bg-opacity-10 rounded shadow-sm">
                        <h3
                            className="m-0 text-info fw-bold"
                            style={{ letterSpacing: "1.5px" }}
                        >
                            Dəstəkçilər İdarəetməsi
                        </h3>
                        <button
                            className="btn btn-info d-flex align-items-center"
                            onClick={() => setShowModal(true)}
                        >
                            <FaPlus className="me-2" />
                            Dəstəkçi əlavə et
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-info" role="status">
                                <span className="visually-hidden">Yüklənir...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {supporters.length === 0 && (
                                <div className="text-center text-muted fs-5 mt-5">
                                    Dəstəkçi tapılmadı
                                </div>
                            )}
                            {supporters.map((supporter) => (
                                <div
                                    key={supporter._id}
                                    className="col-6 col-md-4 col-lg-3 d-flex flex-column align-items-center bg-white rounded shadow-sm p-3 position-relative"
                                    style={{
                                        transition: "transform 0.3s ease",
                                        cursor: "pointer",
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                                    onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                                >
                                    <img
                                        src={supporter.image}
                                        alt="supporter"
                                        className="img-fluid rounded mb-3"
                                        style={{ maxHeight: "120px", objectFit: "contain" }}
                                    />
                                    <button
                                        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                                        onClick={() => handleDelete(supporter._id)}
                                        title="Dəstəkçini sil"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <AddSupporterModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        onSave={(data) => {
                            handleAdd(data);
                            setShowModal(false);
                        }}
                    />
                </main>
            </div>
        </div>

    );
};

export default SponsorAdmin;
