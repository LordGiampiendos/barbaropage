import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function OTP() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { login, email } = useAuth();
    const [error, setError] = useState('');
    const formik = useFormik({
        initialValues: {
            OTP: '',
        },
        validationSchema: Yup.object({
            OTP: Yup.string().required('L\'OTP è obbligatorio'),
        }),
        onSubmit: (values) => {
            setIsLoading(true);
            axios.post("https://serverbarbaropersonal.pagekite.me/mfa/verify-code-login", { code: values.OTP, email: email }, { withCredentials: true })
                .then(response => {
                    login(response.data);
                    navigate('/');
                    setIsLoading(false);
                })
                .catch(error => {
                    setError(error.response.data);
                    console.error('Errore durante il login:', error);
                    setIsLoading(false);
                });
        },
    });

    return (
        <Container>
            <Row className="justify-content-center" style={{ margin: '50px' }}>
                <Col md={6}>
                    <h2>Accedi</h2>
                    <br />
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group controlId="formOTP">
                            <Form.Label>Codice OTP</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Inserisci l'OTP"
                                {...formik.getFieldProps('OTP')}
                                isInvalid={formik.touched.OTP && formik.errors.OTP}
                            />
                            <Form.Control.Feedback type="invalid">
                                {formik.errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <br />
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
                                'Accedi'
                            )}
                        </Button>
                    </Form>

                    <br />
                    {error && <Alert variant="danger">{error}</Alert>}
                </Col>
            </Row>
        </Container>
    );
}

export default OTP;