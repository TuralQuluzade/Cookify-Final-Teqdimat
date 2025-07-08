import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import AddComponentModal from "./AddComponentModal";
import {
    deleteComponentsThunk,
    getComponentsThunk,
    postComponentsThunk
} from "../../../redux/reducers/componentsReducer.js";
import { FaCogs } from "react-icons/fa";
import Sidebar from "../sidebar/Sidebar.jsx";

const ManageComponents = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.components.components);
    const loading=useSelector((state) => state.components.loading);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(getComponentsThunk());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteComponentsThunk(id));
        toast.warning("Component silindi");
    };

    const handleCreate = (data) => {
        dispatch(postComponentsThunk(data));
        setShowModal(false);
        toast.success("Component əlavə olundu");
    };

    return (
        <div className="container-fluid">
            <div className="row" style={{ minHeight: "100vh" }}>
                {/* Sidebar */}
                <Sidebar/>

                {/* Əsas kontent */}
                <main className="col-md-9 col-lg-10 p-4">
                    <div className="d-flex align-items-center justify-content-between mb-4 p-3 bg-success bg-opacity-10 rounded shadow-sm">
                        <div className="d-flex align-items-center">
                            <FaCogs size={30} className="text-success me-3" />
                            <h3 className="m-0 text-success fw-bold" style={{ letterSpacing: "1.5px" }}>
                                Component İdarəetmə
                            </h3>
                        </div>
                        <button className="btn btn-success" onClick={() => setShowModal(true)}>
                            Component əlavə et
                        </button>
                    </div>

                    {loading ? (
                        <div>Yüklənir...</div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-striped table-hover">
                                <thead className="table-success">
                                <tr>
                                    <th>#</th>
                                    <th>Ad</th>
                                    <th>Əməliyyat</th>
                                </tr>
                                </thead>
                                <tbody>
                                {items.map((comp, idx) => (
                                    <tr key={comp._id}>
                                        <td>{idx + 1}</td>
                                        <td>{comp.name}</td>
                                        <td>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(comp._id)}
                                            >
                                                Sil
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <AddComponentModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        onSave={handleCreate}
                    />
                </main>
            </div>
        </div>

    );
};

export default ManageComponents;
