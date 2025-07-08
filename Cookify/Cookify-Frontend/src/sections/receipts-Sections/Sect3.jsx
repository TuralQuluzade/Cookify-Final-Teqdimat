import React, {useState} from 'react';
import {Container, Pagination, Row} from "react-bootstrap";
import {useSelector} from "react-redux";

const Sect3 = () => {
    const data = useSelector((state) => state.recepts.recepts);
    const loading = useSelector((state) => state.recepts.loading);
    const error = useSelector((state) => state.recepts.error);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    if (loading) {
        return <span>Yuklenir ...</span>
    }
    if (error) {
        return <div>Error</div>
    }

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  return (
      <Container className="py-2" style={{ backgroundColor: '#DFFFE0', borderRadius: '10px' }}>
          <Row className="justify-content-center mt-4">
              <Pagination className="d-flex flex-wrap justify-content-center" style={{ backgroundColor: '#DFFFE0' }}>
                  {[...Array(totalPages)].map((_, idx) => (
                      <Pagination.Item
                          key={idx}
                          active={idx + 1 === currentPage}
                          onClick={() => handlePageChange(idx + 1)}
                          style={{
                              color: idx + 1 === currentPage ? 'white' : '#063B14',
                              backgroundColor: idx + 1 === currentPage ? '#063B14' : 'transparent',
                              border: '1px solid #063B14',
                              margin: '0 5px',
                              borderRadius: '5px'
                          }}
                      >
                          {idx + 1}
                      </Pagination.Item>
                  ))}
              </Pagination>
          </Row>
      </Container>



  );
};

export default Sect3;