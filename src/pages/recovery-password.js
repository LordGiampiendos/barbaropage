import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function RecoveryPassword() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Formato email non valido')
                .required('L\'email è obbligatoria')
        }),
        onSubmit: (values) => {
            setIsLoading(true);
            axios.post('https://serverbarbaropersonal.pagekite.me/users/recovery-password', values, {withCredentials: true})
            .then(response => {
                navigate('/login');
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Errore durante il recupero:', error);
                setError(error.response.data);
                setIsLoading(false);
            });
        },
    });

    return (
        <Container>
            <Row className="justify-content-center" style={{ margin: '50px' }}>
                <Col md={6}>
                <h2>Recupera Password</h2>
                <br/>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Inserisci l'email"
                        {...formik.getFieldProps('email')}
                        isInvalid={formik.touched.email && formik.errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.email}
                    </Form.Control.Feedback>
                    </Form.Group>
                    
                    <br/>
                    <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
                        {isLoading ? (
                            <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />
                        ) : (
                            'Invia Email'
                        )}
                    </Button>
                </Form>

                <br/>
                {error && <Alert variant="danger">{error}</Alert>}
                </Col>
            </Row>
        </Container>
    );
}

export default RecoveryPassword;