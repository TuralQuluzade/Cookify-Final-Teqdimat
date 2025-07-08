import React from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Sect4 = () => {
    const navigate = useNavigate();
  return (
      <section
          style={{ height: '60vh', backgroundColor: '#042C0F' }}
          className="d-flex align-items-center"
      >
          <Container>
              <Row className="align-items-center">

                  {/* Sol: Şəkil */}
                  <Col md={6} data-aos="fade-right">
                      <img
                          src="/inspiration.jpg"
                          alt="İlham al"
                          className="img-fluid rounded shadow"
                      />
                  </Col>

                  {/* Sağ: Başlıq və Mətn */}
                  <Col md={6} data-aos="fade-left">
                      <h2 className="mb-3" style={{ color: '#DFFFE0' }}>
                          İlham al – Yeni reseptlər kəşf et
                      </h2>
                      <p style={{ color: '#CDECCF' }}>
                          Hər həftə yenilənən resept tövsiyələri və mövsümə uyğun təkliflərlə mətbəxində fərqli ləzzətlərə yol aç.
                          Sadə və sağlam yeməklər Cookify.az ilə bir addım uzaqlıqda!
                      </p>
                      <Button onClick={()=>{navigate("/receipts")}} variant="light" style={{ color: '#063B14', fontWeight: 'bold' }}>
                          Reseptləri aç
                      </Button>
                  </Col>

              </Row>
          </Container>
      </section>
  );
};

export default Sect4;