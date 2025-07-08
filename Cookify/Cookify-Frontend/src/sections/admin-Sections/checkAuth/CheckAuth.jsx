import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../sidebar/Sidebar.jsx";

const AuthUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const res = await axios.get("http://localhost:3000/api/users", {
                    withCredentials: true,
                });
                setUsers(res.data);
            } catch (err) {
                console.error("User-ları yükləyə bilmədim:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);
    const handleDelete = async (id) => {
        if (!window.confirm("Silmək istədiyinizə əminsiniz?")) return;
        try {
            await axios.delete(`http://localhost:3000/api/users/${id}`, {
                withCredentials: true,
            });
            setUsers(users.filter((u) => u._id !== id)); // local state yenilə
        } catch (err) {
            console.error("Silinmə xətası:", err);
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === "active" ? "blocked" : "active";
        try {
            const res = await axios.put(
                `http://localhost:3000/api/users/${id}/status`,
                { status: newStatus },
                {
                    withCredentials: true,
                }
            );
            // local state yenilə
            setUsers(users.map(u => u._id === id ? res.data : u));
        } catch (err) {
            console.error("Status dəyişmə xətası:", err);
        }
    };


    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <div
                style={{
                    // marginLeft: "250px",
                    padding: "20px",
                    width: "100%",
                    backgroundColor: "white",
                }}
            >
                <h3
                    className="mb-4 p-2 rounded text-center"
                    style={{
                        backgroundColor: "#A6FFA9",
                        color: "#063B14",
                        fontWeight: "bold",
                    }}
                >
                    İstifadəçilər
                </h3>
                <button
                    className="btn btn-success mb-3"
                    style={{
                        backgroundColor: "#063B14",
                        borderColor: "#063B14",
                    }}
                    onClick={() => navigate("/admin")}
                >
                    ← Admin Panelinə qayıt
                </button>

                {loading ? (
                    <div>Yüklənir...</div>
                ) : (
                    <table className="table table-bordered table-striped align-middle">
                        <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Ad</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Status</th>
                            <th>Əməliyyat</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>
                    <span
                        className={`badge ${
                            user.role === "admin" ? "bg-success" : "bg-secondary"
                        }`}
                    >
                      {user.role}
                    </span>
                                </td>
                                <td>
                    <span
                        className={`badge ${
                            user.status === "active" ? "bg-primary" : "bg-danger"
                        }`}
                    >
                      {user.status === "active" ? "Aktiv" : "Bloklu"}
                    </span>
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            Sil
                                        </button>
                                        <button
                                            className="btn btn-sm btn-warning"
                                            onClick={() => handleToggleStatus(user._id, user.status)}
                                        >
                                            {user.status === "active" ? "Blokla" : "Aktiv et"}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AuthUsersPage;

