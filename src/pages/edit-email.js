import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function EditEmailPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { logout } = useAuth();
    const [error, setError] = useState('');
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Formato email non valido')
                .required('L\'email è obbligatoria'),
            password: Yup.string()
                .min(6, 'La password deve contenere almeno 6 caratteri')
                .required('La password è obbligatoria'),
        }),
        onSubmit: (values) => {
            setIsLoading(true);
            axios.post('https://serverbarbaropersonal.pagekite.me/users/edit-email', values, {withCredentials: true})
            .then(response => {
                logout(response.data);
                navigate('/');
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Errore durante la modifica dell\'email:', error);
                setError(error.response.data);
                setIsLoading(false);
            });
        },
    });

    return (
        <Container>
            <Row className="justify-content-center" style={{ margin: '50px' }}>
                <Col md={6}>
                <h2>Modifica Email</h2>
                <br/>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="formEmail">
                    <Form.Label>Nuova Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Inserisci la nuova email"
                        {...formik.getFieldProps('email')}
                        isInvalid={formik.touched.email && formik.errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.email}
                    </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formPassword" style={{ marginTop: '10px' }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Inserisci la password"
                        {...formik.getFieldProps('password')}
                        isInvalid={formik.touched.password && formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
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
                            'Cambia Email'
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

export default EditEmailPage;