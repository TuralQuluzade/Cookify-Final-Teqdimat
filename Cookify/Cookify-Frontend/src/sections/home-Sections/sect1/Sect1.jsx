import React, {useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Card,Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import {fetchBlogs} from "../../../redux/reducers/blogReducer.js";
import {useNavigate} from "react-router-dom";

const sectionStyle = {
    minHeight: "80vh",
    backgroundColor: "#063B14",
    color: "#DFFFE0",
    padding: "60px 20px",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    backgroundPosition: "center",
};

const sections = [
    {
        title: "Welcome to Cookify!",
        content:
            "Discover delicious recipes and share your own culinary creations. Get inspired by a global food-loving community.",
        image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=960&q=80",
    }
];

// const trendPosts = [
//     {
//         title: "Summer Salad Madness",
//         image: "https://cdn.pixabay.com/photo/2016/11/29/03/53/appetizer-1869677_960_720.jpg",
//     },
//     {
//         title: "Homemade Pasta Secrets",
//         image: "https://cdn.pixabay.com/photo/2020/11/06/18/35/pasta-5718543_960_720.jpg",
//     },
//     {
//         title: "Vegan Desserts",
//         image: "https://cdn.pixabay.com/photo/2017/03/27/14/56/cake-2178874_960_720.jpg",
//     },
// ];

const Homepage = () => {
    const dispatch = useDispatch();
    const navigate =useNavigate()

    // Backend-dən gələn bütün blogları seçirik
    const blogs = useSelector((state) => state.blog.items);
    const loading = useSelector((state) => state.blog.loading);
    const error = useSelector((state) => state.blog.error);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);


    const trendPosts = Array.isArray(blogs) ? blogs.slice(0, 3) : [];

    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (error) return <p className="text-center text-danger mt-5">Error: {error}</p>;
    if (trendPosts.length === 0) return <p className="text-center mt-5">No posts yet.</p>;

    return (
        <div>
            {sections.map((section, index) => (
                <motion.div
                    key={index}
                    style={{ ...sectionStyle, backgroundImage: `url(${section.image})` }}
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <Container>
                        <Row className="align-items-center" style={{ backgroundColor: "rgba(6, 59, 20, 0.85)", borderRadius: "1rem", padding: "20px" }}>
                            <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
                                <h1 className="display-5 fw-bold">{section.title}</h1>
                                <p className="lead mt-3">{section.content}</p>
                            </Col>
                            <Col md={6} className="text-center">
                                <motion.img
                                    src={section.image}
                                    alt={section.title}
                                    className="img-fluid rounded shadow"
                                    initial={{ scale: 0.9 }}
                                    whileHover={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ maxHeight: "400px" }}
                                />
                            </Col>
                        </Row>
                    </Container>
                </motion.div>
            ))}

            {/* Trend Postlar Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{
                    background: "linear-gradient(135deg, #063B14, #0a5622)",
                    color: "#DFFFE0",
                    padding: "100px 0",
                }}
            >
                <Container>
                    <Row className="align-items-center">
                        {/* Left: Text */}
                        <Col md={6} className="text-center text-md-start">
                            <motion.h1
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                className="fw-bold display-4 mb-4"
                            >
                                Discover, Share & Taste the World 🌍
                            </motion.h1>
                            <motion.p
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="lead mb-4"
                            >
                                Join Cookify to explore global flavors, secret family recipes, and cooking tips from thousands of passionate chefs.
                            </motion.p>
                            <motion.div
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                            >
                                <Button
                                    onClick={()=>{navigate("/blogs")}}
                                    variant="light"
                                    style={{
                                        color: "#063B14",
                                        fontWeight: "bold",
                                        padding: "10px 25px",
                                        borderRadius: "30px",
                                    }}
                                >
                                    Start Exploring
                                </Button>
                            </motion.div>
                        </Col>

                        {/* Right: Image */}
                        <Col md={6} className="text-center mt-5 mt-md-0">
                            <motion.img
                                src="https://cdn.pixabay.com/photo/2017/06/02/18/24/salmon-2367029_1280.jpg"
                                alt="Delicious food"
                                className="img-fluid rounded shadow"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                                style={{ maxHeight: "400px", objectFit: "cover" }}
                            />
                        </Col>
                    </Row>
                </Container>
            </motion.div>
        </div>
    );
};

export default Homepage;
