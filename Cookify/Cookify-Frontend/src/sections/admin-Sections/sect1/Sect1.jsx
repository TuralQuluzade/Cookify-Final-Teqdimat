import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sect1.css';
import {useNavigate} from "react-router-dom";
import { Users, FileText, Layers, MessageSquare, BookOpen, Heart } from "lucide-react";
import Sidebar from "../sidebar/Sidebar.jsx";
import Home from "../../../pages/Home.jsx";

const adminItems = [
    { title: "İstifadəçilər", key: "auth", icon: <Users size={32} /> , path: "/check/Auth"},
    { title: "Bloq Yazıları", key: "blogs", icon: <FileText size={32} />, path: "/admin/blogs"},
    { title: "Komponentlər", key: "components", icon: <Layers size={32} />, path: "/admin/components"},
    { title: "Rəylər", key: "feedback", icon: <MessageSquare size={32} />, path: "/admin/feedback"},
    { title: "Reseptlər", key: "receipts", icon: <BookOpen size={32} />, path: "/admin/receipts"},
    { title: "Dəstəkçilər", key: "supporters", icon: <Heart size={32} />, path: "/admin/supporters"},
    { title: "Gündəlik Tapşırıqlar", key: "daily-tasks", icon: <Layers size={32} />, path: "/admin/daily-tasks" },
];
const AdminPage = () => {
    const navigate = useNavigate();
    return (
        <div className="admin-container d-flex">
            {/* Sidebar */}
            <Sidebar/>
            {/* Main Content */}
            <main className="flex-grow-1 p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-dark">Dashboard</h2>
                    <button onClick={()=>{navigate("/")}} className="btn btn-success">Çıxış</button>
                </div>

                <div className="row g-4">
                    {adminItems.map((item, index) => (
                        <div className="col-md-4" key={index}>
                            <div
                                className="card shadow-sm h-100 text-center p-4"
                                style={{
                                    cursor: "pointer",
                                    backgroundColor: "#A6FFA9",
                                    color: "#063B14",
                                    border: "none",
                                    transition: "transform 0.3s",
                                }}
                                onClick={() => navigate(item.path)}
                                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            >
                                <div className="mb-3">{item.icon}</div>
                                <h5 className="fw-bold">{item.title}</h5>
                                <small>Ətraflı baxmaq üçün kliklə</small>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AdminPage;
