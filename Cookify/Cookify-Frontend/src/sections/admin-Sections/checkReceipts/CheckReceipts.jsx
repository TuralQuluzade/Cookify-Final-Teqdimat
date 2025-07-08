import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import AddEditReceptModal from "./AddReceptModal";
import {
    deleteReceptThunk,
    getReceptThunk,
    postReceptThunk,
    updateReceptThunk,
} from "../../../redux/reducers/receptsReducer.js";
import Sidebar from "../sidebar/Sidebar.jsx";

const ReceptsAdmin = () => {
    const dispatch = useDispatch();
    const recepts = useSelector((state) => state.recepts.recepts);
    const loading = useSelector((state) => state.recepts.loading);

    const [showModal, setShowModal] = useState(false);
    const [editingRecept, setEditingRecept] = useState(null); //

    useEffect(() => {
        dispatch(getReceptThunk());
    }, [dispatch]);

    const handleAdd = (data) => {
        dispatch(postReceptThunk(data));
    };

    const handleUpdate = (id, data) => {
        dispatch(updateReceptThunk({ id, data }));
    };

    const handleDelete = (id) => {
        if (window.confirm("Recepti silmək istədiyinizə əminsiniz?")) {
            dispatch(deleteReceptThunk(id));
        }
    };

    const openAddModal = () => {
        setEditingRecept(null);
        setShowModal(true);
    };

    const openEditModal = (recept) => {
        setEditingRecept(recept);
        setShowModal(true);
    };

    const handleSave = (data) => {
        if (editingRecept) {

            handleUpdate(editingRecept._id, data);
        } else {

            handleAdd(data);
        }
        setShowModal(false);
    };

    return (
        <div className="container-fluid">
            <div className="row" style={{ minHeight: "100vh" }}>
                {/* Sidebar burada... */}
                    <Sidebar/>
                {/* Main content */}
                <main style={{backgroundColor:"white"}} className="col-md-9 col-lg-10 p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4 p-3 bg-primary bg-opacity-10 rounded shadow-sm">
                        <h3
                            className="m-0 text-primary fw-bold"
                            style={{ letterSpacing: "1.5px" }}
                        >
                            Recepts İdarəetmə
                        </h3>
                        <button
                            className="btn btn-primary d-flex align-items-center"
                            onClick={openAddModal}
                        >
                            <FaPlus className="me-2" />
                            Recept əlavə et
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-primary" role="status" />
                            <div>Yüklənir...</div>
                        </div>
                    ) : (
                        <div className="table-responsive shadow-sm rounded">
                            <table className="table table-striped table-hover align-middle">
                                <thead className="table-primary">
                                <tr>
                                    <th>#</th>
                                    <th>Ad</th>
                                    <th>Kateqoriya</th>
                                    <th>Vaxt</th>
                                    <th>İngredientlər</th>
                                    <th>Şəkil</th>
                                    <th>Əməliyyatlar</th>
                                </tr>
                                </thead>
                                <tbody>
                                {(!recepts || recepts.length === 0) && (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted">
                                            Recept tapılmadı
                                        </td>
                                    </tr>
                                )}
                                {recepts &&
                                    recepts.length > 0 &&
                                    recepts.map((rec, idx) => (
                                        <tr key={rec._id}>
                                            <td>{idx + 1}</td>
                                            <td>{rec.name}</td>
                                            <td>{rec.category}</td>
                                            <td>{rec.time}</td>
                                            <td>{rec.components.join(", ")}</td>
                                            <td>
                                                <img
                                                    src={rec.image}
                                                    alt={rec.name}
                                                    style={{
                                                        width: "60px",
                                                        height: "40px",
                                                        objectFit: "cover",
                                                        borderRadius: "4px",
                                                    }}
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-warning btn-sm me-2"
                                                    title="Redaktə et"
                                                    onClick={() => openEditModal(rec)}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    title="Sil"
                                                    onClick={() => handleDelete(rec._id)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <AddEditReceptModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        onSave={handleSave}
                        initialData={editingRecept}
                    />
                </main>
            </div>
        </div>
    );
};

export default ReceptsAdmin;
