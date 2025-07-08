import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddEditReceptModal = ({ show, onHide, onSave, initialData }) => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [time, setTime] = useState("");
    const [components, setComponents] = useState("");
    const [image, setImage] = useState("");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || "");
            setCategory(initialData.category || "");
            setTime(initialData.time || "");
            setComponents(initialData.components ? initialData.components.join(", ") : "");
            setImage(initialData.image || "");
        } else {
            setName("");
            setCategory("");
            setTime("");
            setComponents("");
            setImage("");
        }
    }, [initialData, show]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const compArr = components.split(",").map((c) => c.trim()).filter(Boolean);

        if (!name || !category || !time || compArr.length === 0 || !image) {
            alert("Bütün sahələri doldurun.");
            return;
        }

        onSave({ name, category, time, components: compArr, image });
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>{initialData ? "Recept Redaktə et" : "Yeni Recept Əlavə et"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Ad</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Recept adı"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCategory">
                        <Form.Label>Kateqoriya</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Kateqoriya"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTime">
                        <Form.Label>Vaxt</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Hazırlanma vaxtı"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formComponents">
                        <Form.Label>İngredientlər (vergüllə ayrılmış)</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Misal: un, süd, şəkər"
                            value={components}
                            onChange={(e) => setComponents(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formImage">
                        <Form.Label>Şəkil URL</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Şəkil URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Ləğv et
                    </Button>
                    <Button variant="primary" type="submit">
                        Yadda saxla
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default AddEditReceptModal;
