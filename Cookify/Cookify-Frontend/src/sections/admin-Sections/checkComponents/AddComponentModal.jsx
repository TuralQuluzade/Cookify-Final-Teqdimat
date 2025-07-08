import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddComponentModal = ({ show, onHide, onSave }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        setFormData({ name: "", description: "" });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Yeni Component Əlavə Et</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Ad</Form.Label>
                        <Form.Control
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Bağla
                    </Button>
                    <Button variant="success" type="submit">
                        Yadda saxla
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddComponentModal;
