import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from './context/AuthContext';

const LogoutPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

  return (
    <Container className="text-center" style={{ height: '50vh' }} >
      <Row className="justify-content-center align-items-center" style={{ minHeight: '50vh' }} >
        <Col md={6}>
          <Alert variant="info">
            <Alert.Heading>Logout in corso...</Alert.Heading>
            <p>Ti stiamo disconnettendo dal sistema. Attendere un momento...</p>
          </Alert>
          <Button variant="primary" onClick={() => navigate('/login')} style={{ marginTop: '10px' }} >Vai alla pagina di login</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LogoutPage;