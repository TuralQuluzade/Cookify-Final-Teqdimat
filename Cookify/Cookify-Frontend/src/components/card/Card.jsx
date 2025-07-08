import React, {useEffect, useState} from 'react';
import { Card, Button } from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {getReceptThunk} from "../../redux/reducers/receptsReducer.js";
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

import "./Card.css"
import { toggleFavoriteThunk} from "../../redux/reducers/favoritesReducer.js";

const ReceiptCard = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.items);
    const data = useSelector((state) => state.recepts.recepts);
    const loading = useSelector((state) => state.recepts.loading);
    const error = useSelector((state) => state.recepts.error);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const [localFavorites, setLocalFavorites] = useState([]);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    console.log("FAVORITES", favorites);
    console.log("CURRENT ITEM ID", data.id);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleToggle = (recipeId) => {
        const isFavorite = localFavorites.some(fav => fav._id === recipeId);


        if (isFavorite) {
            setLocalFavorites(prev => prev.filter(fav => fav._id !== recipeId));
        } else {

            setLocalFavorites(prev => [...prev, { _id: recipeId }]);
        }


        dispatch(toggleFavoriteThunk({ recipeId }));
    };

    useEffect(() => {
        dispatch(getReceptThunk())
    }, [dispatch]);
    useEffect(() => {
        setLocalFavorites(favorites);
    }, [favorites]);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <Container style={{backgroundColor:"#296636",borderRadius:"15px"}} className="py-5">
            <Row className="justify-content-center">
                {currentItems.map((item, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
                        <Card style={{ position: 'relative', width: '18rem', backgroundColor: '#DFFFE0', borderRadius: '15px', border: 'none' }} className="shadow-sm m-3">
                            {/* Ürək */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10,
                                    cursor: 'pointer',
                                    backgroundColor: '#DFFFE0',
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
                                    icon={localFavorites.some(fav => fav._id === item._id) ? solidHeart : regularHeart}
                                    style={{
                                        color: localFavorites.some(fav => fav._id === item._id) ? "red" : "#555",
                                        fontSize: "1.2rem"
                                    }}
                                />
                            </div>


                            <Card.Img variant="top" src={item.image} style={{ height: '180px', objectFit: 'cover', borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }} />
                            <Card.Body>
                                <Card.Title style={{ fontWeight: 'bold' }}>{item.name}</Card.Title>
                                <Card.Text>
                                    <strong>İçindəkilər:</strong>
                                    <div className="d-flex flex-wrap gap-2 mt-2">
                                        {item.components.map((comp, i) => (
                                            <span key={i} className="badge bg-success text-light p-2 rounded-pill">{comp}</span>
                                        ))}
                                    </div>
                                    <div className="mt-3">
                                        <strong>Hazırlanma vaxtı:</strong> {item.time} dəqiqə
                                    </div>
                                </Card.Text>
                                <Button variant="success" className="w-100">Ətraflı</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row className="justify-content-center mt-4">
                <Pagination className="d-flex flex-wrap justify-content-center">
                    {[...Array(totalPages)].map((_, idx) => {
                        const isActive = idx + 1 === currentPage;
                        return (
                            <Pagination.Item
                                key={idx}
                                onClick={() => handlePageChange(idx + 1)}
                                style={{
                                    backgroundColor: isActive ? '#DFFFE0' : 'transparent',
                                    color: '#DFFFE0',
                                    border: '1px solid #DFFFE0',
                                    margin: '0 5px',
                                    borderRadius: '5px',
                                    padding: '6px 12px',
                                    fontWeight: isActive ? 'bold' : 'normal',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {idx + 1}
                            </Pagination.Item>
                        );
                    })}
                </Pagination>
            </Row>

        </Container>

    );
};

export default ReceiptCard;

