import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";

const DailyTasksAdmin = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("http://localhost:3000/daily-task/admin", {
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Xəta baş verdi");
            setTasks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleApprove = async (id) => {
        try {
            await fetch(`http://localhost:3000/daily-task/admin/${id}/approve`, {
                method: "PUT",
                credentials: "include",
            });
            fetchTasks();
        } catch (err) {
            alert("Təsdiqləmə alınmadı: " + err.message);
        }
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;
    console.log("Şəkil yolu:", tasks.photo);
    return (
        <div>
            <h2>Gündəlik Tapşırıqların İdarəsi</h2>
            {tasks.length === 0 ? (
                <p>Heç bir təhvil verilmiş tapşırıq yoxdur.</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>İstifadəçi</th>
                        <th>Yemək</th>
                        <th>Şəkil</th>
                        <th>Yükləmə Tarixi</th>
                        <th>Status</th>
                        <th>Əməliyyat</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task)=> {
                        console.log("Task object", task)
                        return (
                            <tr key={task._id}>
                                <td>{task._id}</td>
                                <td>{task.user?.username || "N/A"}</td>
                                <td>{task.dish}</td>
                                <td>
                                    <img
                                        src={`http://localhost:3000${task.photoUrl}`}
                                        alt="Task"
                                        style={{width: "100px", objectFit: "cover"}}
                                    />
                                </td>
                                <td>{new Date(task.createdAt).toLocaleString()}</td>
                                <td>{task.status}</td>
                                <td>
                                    {task.status !== "approved" && (
                                        <Button variant="success" onClick={() => handleApprove(task._id)}>
                                            Təsdiqlə
                                        </Button>
                                    )}
                                    {task.status === "approved" && <span>Qəbul edildi</span>}
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default DailyTasksAdmin;
