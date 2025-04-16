import React, { useState } from 'react';
import { Button, Form, Alert, Container, Row, Col, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    newPassword: Yup.string()
        .min(6, 'La nuova password deve essere di almeno 6 caratteri.')
        .required('La nuova password è obbligatoria'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Le password non corrispondono')
        .required('La conferma della password è obbligatoria'),
});
  
function InsertPassword() {
    const { logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [message, setMessage] = React.useState(null);

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setMessage(null);
            setIsLoading(true);
            const formData = new FormData();
            formData.append("newPassword", values.newPassword);

            axios.post('https://serverbarbaropersonal.pagekite.me/users/insert-password', formData, { withCredentials: true })
            .then(response => {
                logout();
                navigate('/login');
                setIsLoading(false);
            })
            .catch(error => {
                setMessage({
                    type: 'error',
                    text: error.response?.data?.message || 'Si è verificato un errore durante l\'inserimenoto della password.',
                });
                setIsLoading(false);
            });
        },
    });

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Inserisci la tua Password</h2>
                    <Form onSubmit={formik.handleSubmit}>
                        {message && (
                        <Alert variant={message.type === 'success' ? 'success' : 'danger'}>
                            {message.text}
                        </Alert>
                        )}

                        <br/>
                        <Form.Group controlId="newPassword">
                        <Form.Label>Nuova Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Inserisci una nuova password"
                            name="newPassword"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.newPassword && formik.errors.newPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.newPassword}
                        </Form.Control.Feedback>
                        </Form.Group>

                        <br/>
                        <Form.Group controlId="confirmPassword">
                        <Form.Label>Conferma Nuova Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Conferma la tua nuova password"
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.confirmPassword}
                        </Form.Control.Feedback>
                        </Form.Group>
                        
                        <br/>
                        <br/>
                        <Button variant="primary" type="submit">
                            {isLoading ? (
                                <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                />
                            ) : (
                                'Inserisci Password'
                            )}
                        </Button>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default InsertPassword;