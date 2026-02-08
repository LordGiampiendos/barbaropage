import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Alert } from 'react-bootstrap';

const VerifieEmailPage = () => {
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    useEffect(() => {
        if (!token) {
            setError('Token mancante o non valido');
        }
        else {
            const formData = new FormData();
            formData.append("token", token);
            axios.post('https://serverbarbaropersonal.pagekite.me/users/verifie-email', formData)
            .then(response => {
                navigate("/login?success=ok");
            })
            .catch(error => {
                setError(error.response.data);
            });
        }
    }, [token, navigate]);

    return (
        <Container className="mt-5">
        <Row>
            <Col md={6} className="offset-md-3">
            <h2>Stiamo verificando la tua email</h2>
            <br/>
            {error && <Alert variant="danger">{error}</Alert>}
            </Col>
        </Row>
        <br/>
        <br/>
        </Container>
    );
};


export default VerifieEmailPage;
