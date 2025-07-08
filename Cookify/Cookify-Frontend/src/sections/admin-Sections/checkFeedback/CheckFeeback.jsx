import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFeedbackThunk, deleteFeedbackThunk } from "../../../redux/reducers/feedbackReducer";
import { FaTrash, FaReply } from "react-icons/fa";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import Sidebar from "../sidebar/Sidebar.jsx";

const FeedbackAdmin = () => {
    const dispatch = useDispatch();
    const { feedback, loading } = useSelector((state) => state.feedback);

    const [showReplyModal, setShowReplyModal] = useState(false);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [replyMessage, setReplyMessage] = useState("");

    useEffect(() => {
        dispatch(getFeedbackThunk());
    }, [dispatch]);

    const handleDelete = (id) => {
        if (window.confirm("Bu feedbacki silmək istədiyinizə əminsiniz?")) {
            dispatch(deleteFeedbackThunk(id));
        }
    };

    const handleReply = (fb) => {
        setSelectedFeedback(fb);
        setReplyMessage("");
        setShowReplyModal(true);
    };

    const sendReply = async () => {
        try {
            await axios.post("http://localhost:3000/feedback/reply", {
                to: selectedFeedback.email,
                message: replyMessage,
            });
            alert("Cavab göndərildi!");
            setShowReplyModal(false);
        } catch (err) {
            console.error(err);
            alert("Cavab göndərilərkən xəta baş verdi.");
        }
    };

    return (
        <div className="container-fluid">
            <div className="row" style={{ minHeight: "100vh" }}>

                {/* Sidebar - solda */}
                <Sidebar/>

                {/* Əsas məzmun - sağda */}
                <main className="col-md-10 ms-sm-auto px-md-4 py-4">
                    <div className="d-flex align-items-center justify-content-between mb-4 p-3 bg-secondary bg-opacity-10 rounded shadow-sm">
                        <h3 className="text-secondary fw-bold">Feedback İdarəetmə</h3>
                    </div>

                    {/* Burada feedback cədvəlini, modalları və s. yerləşdirirsən */}
                    {loading ? (
                        <div>Yüklənir...</div>
                    ) : (
                        <div className="table-responsive shadow rounded">
                            <table className="table table-striped table-hover">
                                <thead className="table-secondary">
                                <tr>
                                    <th>#</th>
                                    <th>Ad</th>
                                    <th>Email</th>
                                    <th>Telefon</th>
                                    <th>Tarix</th>
                                    <th>Əməliyyat</th>
                                </tr>
                                </thead>
                                <tbody>
                                {feedback.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="text-center text-muted">
                                            Feedback tapılmadı
                                        </td>
                                    </tr>
                                ) : (
                                    feedback.map((fb, idx) => (
                                        <tr key={fb._id}>
                                            <td>{idx + 1}</td>
                                            <td>{fb.name} {fb.surname}</td>
                                            <td>{fb.email}</td>
                                            <td>{fb.phoneNumber}</td>
                                            <td>{new Date(fb.createdAt).toLocaleDateString()}</td>
                                            <td className="d-flex gap-2">
                                                <button
                                                    className="btn btn-primary btn-sm d-flex align-items-center"
                                                    onClick={() => handleReply(fb)}
                                                >
                                                    <FaReply className="me-1" /> Cavabla
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm d-flex align-items-center"
                                                    onClick={() => handleDelete(fb._id)}
                                                >
                                                    <FaTrash className="me-1" /> Sil
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Reply Modal */}
                    <Modal show={showReplyModal} onHide={() => setShowReplyModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Feedbackə Cavab</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedFeedback && (
                                <>
                                    <p><strong>Mesaj:</strong> {selectedFeedback.textMessage}</p>
                                    <Form.Group>
                                        <Form.Label>Cavabınız</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            value={replyMessage}
                                            onChange={(e) => setReplyMessage(e.target.value)}
                                        />
                                    </Form.Group>
                                </>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-secondary" onClick={() => setShowReplyModal(false)}>Bağla</button>
                            <button className="btn btn-primary" onClick={sendReply}>Göndər</button>
                        </Modal.Footer>
                    </Modal>
                </main>
            </div>
        </div>

    );
};

export default FeedbackAdmin;
