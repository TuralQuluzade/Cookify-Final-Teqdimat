import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const FavoritesIntro = () => {
    return (
        <section
            style={{
                backgroundColor: '#063B14',
                padding: '60px 20px',
                borderRadius: '15px',
                marginBottom: '40px',
                color: '#DFFFE0',
                boxShadow: '0 4px 25px rgba(0, 0, 0, 0.5)',
            }}
        >
            <Container>
                <Row className="align-items-center justify-content-center text-center text-md-start">
                    <Col md={2} className="mb-4 mb-md-0 d-flex justify-content-center">
                        <FontAwesomeIcon
                            icon={faHeart}
                            size="4x"
                            style={{ color: '#A7F3D0', filter: 'drop-shadow(0 0 5px #A7F3D0)' }}
                        />
                    </Col>
                    <Col md={8}>
                        <h1 style={{ fontWeight: '700', fontSize: '2.8rem', marginBottom: '12px' }}>
                            Sənin Favorit Reseptlərin
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: '#BEE7C6', maxWidth: '700px' }}>
                            Burada sevdiyin bütün reseptləri tapa bilərsən. İstədiyini ürəyə klikləyərək favoritlərinə əlavə et və hər zaman asanlıqla əldə et.
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default FavoritesIntro;

