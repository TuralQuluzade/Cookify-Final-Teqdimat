import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddSupporterModal = ({ show, onHide, onSave }) => {
    const [image, setImage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!image) return alert("Zəhmət olmasa, şəkil URL daxil edin");
        onSave({ image });
        setImage("");
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Dəstəkçi əlavə et</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="formImageUrl">
                        <Form.Label>Şəkil URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Şəkil linki daxil edin"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                        <Form.Text className="text-muted">
                            Zəhmət olmasa, tam URL yazın (məsələn: https://...)
                        </Form.Text>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Bağla
                    </Button>
                    <Button type="submit" variant="info">
                        Əlavə et
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddSupporterModal;
