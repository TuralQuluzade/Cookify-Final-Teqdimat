import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { getFavoritesThunk, toggleFavoriteThunk } from '../../../redux/reducers/favoritesReducer.js';
import EmptyFavorites from "../../../components/emptyFavorites/EmptyFavorites.jsx";

const FavoritesPage = () => {
    const dispatch = useDispatch();
    const { items: favorites, loading, error } = useSelector((state) => state.favorites);

    useEffect(() => {
        dispatch(getFavoritesThunk());
    }, [dispatch]);

    const handleToggle = (recipeId) => {
        dispatch(toggleFavoriteThunk({ recipeId }));
    };

    // Yüklənir
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
                <Spinner animation="border" variant="danger" />
            </div>
        );
    }

    // Xəta
    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">Xəta baş verdi: {error.message || error}</Alert>
            </Container>
        );
    }

    // Boş siyahı
    if (!Array.isArray(favorites) || favorites.length === 0) {
        return (
            <EmptyFavorites/>
        );
    }

    return (
        <Container>
            <h2 className="text-center my-4">Favorit Reseptlər</h2>
            <Row className="justify-content-center">
                {favorites.map((item) => (
                    <Col key={item._id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
                        <Card
                            style={{
                                position: 'relative',
                                width: '18rem',
                                backgroundColor: '#FFF4F4',
                                borderRadius: '15px',
                                border: 'none',
                            }}
                            className="shadow-sm m-3"
                        >
                            {/* Heart Icon */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    cursor: 'pointer',
                                    backgroundColor: '#FFD1D1',
                                    borderRadius: '50%',
                                    padding: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                                }}
                                onClick={() => handleToggle(item._id)}
                            >
                                <FontAwesomeIcon
                                    icon={solidHeart}
                                    style={{
                                        color: 'red',
                                        fontSize: '1.2rem',
                                    }}
                                />
                            </div>

                            {/* Image */}
                            <Card.Img
                                variant="top"
                                src={item.image}
                                alt={item.name}
                                style={{
                                    height: '180px',
                                    objectFit: 'cover',
                                    borderTopLeftRadius: '15px',
                                    borderTopRightRadius: '15px',
                                }}
                            />

                            {/* Body */}
                            <Card.Body>
                                <Card.Title className="fw-bold">{item.name}</Card.Title>
                                <Card.Text>
                                    <strong>İçindəkilər:</strong>
                                    <div className="d-flex flex-wrap gap-2 mt-2">
                                        {Array.isArray(item.components) &&
                                            item.components.map((comp, i) => (
                                                <span
                                                    key={i}
                                                    className="badge bg-danger text-light p-2 rounded-pill"
                                                >
                                                    {comp}
                                                </span>
                                            ))}
                                    </div>
                                    <div className="mt-3">
                                        <strong>Hazırlanma vaxtı:</strong> {item.time} dəqiqə
                                    </div>
                                </Card.Text>
                                <Button variant="danger" className="w-100">
                                    Ətraflı
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FavoritesPage;

