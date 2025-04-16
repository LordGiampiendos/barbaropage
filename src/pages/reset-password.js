import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button, Form as BootstrapForm, Container, Row, Col, Alert } from 'react-bootstrap';

const validationSchema = Yup.object({
    newPassword: Yup.string()
        .required('La password è obbligatoria')
        .min(6, 'La password deve contenere almeno 8 caratteri'),
    confirmPassword: Yup.string()
        .required('La conferma della password è obbligatoria')
        .oneOf([Yup.ref('newPassword'), null], 'Le password non corrispondono')
});

const ResetPassword = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    useEffect(() => {
        if (!token) {
        setError('Token mancante o non valido');
        }
    }, [token]);

    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append("token", token);
        formData.append("newPassword", values.newPassword);
        try {
            const response = await axios.post('https://serverbarbaropersonal.pagekite.me/users/reset-password', formData);
            setSuccess(response.data);
            setTimeout(() => { navigate("/login"); }, 2000);
        } 
        catch (err) {
            setError('Errore nel recupero della password. Prova di nuovo.');
        }
    };

    return (
        <Container className="mt-5">
        <Row>
            <Col md={6} className="offset-md-3">
            <h2>Resetta la tua password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            
            <br/>
            <Formik
                initialValues={{
                newPassword: '',
                confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                <Form>
                    <BootstrapForm.Group controlId="newPassword">
                    <BootstrapForm.Label>Nuova password</BootstrapForm.Label>
                    <Field
                        type="password"
                        className="form-control"
                        id="newPassword"
                        name="newPassword"
                        placeholder="Inserisci la nuova password"
                    />
                    <ErrorMessage name="newPassword" component="div" className="text-danger" />
                    </BootstrapForm.Group>

                    <br/>
                    <BootstrapForm.Group controlId="confirmPassword">
                    <BootstrapForm.Label>Conferma password</BootstrapForm.Label>
                    <Field
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Conferma la nuova password"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                    </BootstrapForm.Group>
                    
                    <br/>
                    <br/>
                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Caricamento...' : 'Resetta la password'}
                    </Button>
                </Form>
                )}
            </Formik>
            </Col>
        </Row>
        <br/>
        <br/>
        </Container>
    );
};

export default ResetPassword;
