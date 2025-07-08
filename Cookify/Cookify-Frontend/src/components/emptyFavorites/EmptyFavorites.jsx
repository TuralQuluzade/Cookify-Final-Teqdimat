import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const EmptyFavorites = () => {
    const navigate = useNavigate();

    return (
        <Container
            className="text-center py-5"
            style={{
                backgroundColor: '#0C4B2C',
                borderRadius: '16px',
                marginTop: '60px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                color: '#DFFFE0',
                marginBottom: '60px',
            }}
        >
            <FontAwesomeIcon
                icon={faHeartCrack}
                size="6x"
                style={{ color: '#FF8A80' }}
            />
            <h2 className="mt-4" style={{ fontWeight: 'bold', color: '#DFFFE0' }}>
                Favorit reseptin yoxdur
            </h2>
            <p className="mt-2" style={{ fontSize: '1.1rem', color: '#A7F3D0' }}>
                Sevdiyin reseptləri ürəyə klikləyərək bu səhifəyə əlavə et!
            </p>
            <Button
                variant="outline-light"
                size="lg"
                className="mt-3"
                style={{
                    borderColor: '#A7F3D0',
                    color: '#A7F3D0',
                }}
                onClick={() => navigate('/receipts')}
            >
                Reseptləri kəşf et
            </Button>
        </Container>
    );
};

export default EmptyFavorites;

