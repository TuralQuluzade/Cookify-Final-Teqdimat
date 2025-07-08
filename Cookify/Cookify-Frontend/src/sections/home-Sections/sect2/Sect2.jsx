// src/components/GiftBoxSection.jsx
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button, Modal, Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {resetSubmitted, startDailyTask, submitDailyTask} from "../../../redux/reducers/dailyTaskReducer.js";


const GiftBoxSection = () => {
    const dispatch = useDispatch();
    const { currentTask, loading, error, submitted } = useSelector(state => state.dailyTask);

    const [show, setShow] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [hasShownAlert, setHasShownAlert] = useState(false);
    const handleGiftClick = () => {
        dispatch(startDailyTask()).then((res) => {
            const task = res.payload?.task || res.payload;

            if (task?.status === "submitted" || task?.status === "approved") {
                alert("Siz artıq tapşırığı tamamlamısınız!");
                setShow(false);  // modalı açmırıq
            } else {
                setShow(true);  // tapşırıq yoxdursa modalı açırıq
            }
        });
    };


    useEffect(() => {
        if (currentTask?.message && !hasShownAlert) {
            alert(currentTask.message);
            setHasShownAlert(true);
        }
    }, [currentTask, hasShownAlert]);
    useEffect(() => {
        if (submitted) {
            setShow(false);
            setUploadedImage(null);
            dispatch(resetSubmitted());
        }
    }, [submitted, dispatch]);
    const handleFileChange = (e) => {
        setUploadedImage(e.target.files[0]);
    };

    const handleSubmit = () => {
        if (!uploadedImage) return;
        dispatch(submitDailyTask({ photo: uploadedImage }));
    };

    return (
        <motion.div
            style={{
                background: "#DFFFE0",
                padding: "100px 0",
                textAlign: "center",
                position: "relative",
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.img
                src="https://cdn-icons-png.flaticon.com/512/437/437316.png"
                alt="Gift Box"
                whileHover={{ scale: 1.1, rotate: [0, 2, -2, 0] }}
                transition={{ duration: 0.3 }}
                style={{
                    cursor: "pointer",
                    width: "150px",
                }}
                onClick={handleGiftClick}
            />

            <h3 className="mt-4 fw-bold" style={{ color: "#063B14" }}>
                Click the gift box to reveal today’s cooking challenge!
            </h3>

            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>🎯 Your Daily Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading && <Spinner animation="border" />}
                    {error && <Alert variant="danger">{error}</Alert>}

                    {currentTask ? (
                        <>
                            <h4>{currentTask.dish || currentTask.name}</h4>
                            <p>
                                You have <strong>24 hours</strong> to cook and upload your result!
                            </p>

                            <input
                                type="file"
                                className="form-control mb-3"
                                accept="image/*"
                                onChange={handleFileChange}
                            />

                            <Button
                                variant="success"
                                onClick={handleSubmit}
                                disabled={!uploadedImage || loading}
                            >
                                Submit Photo
                            </Button>
                        </>
                    ) : (
                        !loading && <p>Click the gift box to get your challenge!</p>
                    )}
                </Modal.Body>
            </Modal>
        </motion.div>
    );
};

export default GiftBoxSection;
