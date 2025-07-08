import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { FaSearch, FaUtensils, FaUsers } from "react-icons/fa";

const steps = [
  {
    title: "1. Discover Unique Recipes",
    description: "Browse thousands of authentic dishes from cultures around the world.",
    icon: <FaSearch size={40} />,
    color: "#FFD700",
  },
  {
    title: "2. Share Your Culinary Creations",
    description: "Upload your own recipes and inspire others with your style.",
    icon: <FaUtensils size={40} />,
    color: "#FF6347",
  },
  {
    title: "3. Connect with Food Lovers",
    description: "Follow, comment, and grow in a vibrant cooking community.",
    icon: <FaUsers size={40} />,
    color: "#32CD32",
  },
];

const Sect3= () => {
  return (
      <motion.div
          style={{
            background: "#063B14",
            color: "#DFFFE0",
            padding: "100px 0",
            position: "relative",
            overflow: "hidden",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
      >
        <Container>
          <motion.h2
              className="text-center fw-bold mb-5"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
          >
            🚀 Your Journey with Cookify
          </motion.h2>

          <Row className="g-4 justify-content-center">
            {steps.map((step, index) => (
                <Col key={index} md={4}>
                  <motion.div
                      whileHover={{ scale: 1.05, rotate: [0, 1, -1, 0] }}
                      transition={{ duration: 0.4 }}
                      className="text-center p-4 rounded shadow"
                      style={{
                        backgroundColor: "#0a5622",
                        border: `2px dashed ${step.color}`,
                        height: "100%",
                        borderRadius: "20px",
                      }}
                  >
                    <div style={{ color: step.color }} className="mb-3">
                      {step.icon}
                    </div>
                    <h4 className="fw-bold mb-3">{step.title}</h4>
                    <p>{step.description}</p>
                  </motion.div>
                </Col>
            ))}
          </Row>
        </Container>

        {/* Background Glow Effects (decorative circles) */}
        <motion.div
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ repeat: Infinity, duration: 6 }}
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              background: "#DFFFE0",
              opacity: 0.1,
              borderRadius: "50%",
              top: "-50px",
              left: "-50px",
              zIndex: 0,
            }}
        />
        <motion.div
            animate={{ scale: [1, 2, 1] }}
            transition={{ repeat: Infinity, duration: 8 }}
            style={{
              position: "absolute",
              width: 300,
              height: 300,
              background: "#DFFFE0",
              opacity: 0.08,
              borderRadius: "50%",
              bottom: "-100px",
              right: "-100px",
              zIndex: 0,
            }}
        />
      </motion.div>
  );
};

export default Sect3;