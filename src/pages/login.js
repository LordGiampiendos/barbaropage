import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(true);

    useEffect(() => {
      const userAgent = navigator.userAgent;
      if (userAgent.includes('AppBarbaro')) {
          setShow(false);
      }
    }, []);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const success = queryParams.get('success');
    const navigate = useNavigate();
    const { login, loginT } = useAuth();
    const [error, setError] = useState('');
    const clientId = '608372132439-b6gpetv4i83u76qe3rho3u4t4dfmog24.apps.googleusercontent.com';
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
          axios.post('https://serverbarbaropersonal.pagekite.me/users/login', values, {withCredentials: true})
            .then(response => {
              login(response.data);
              navigate('/');
              setIsLoading(false);
            })
            .catch(error => {
              if(error.response.data === "MFA") {
                loginT(values.email)
                navigate('/OTP');
              }
              else {
                console.error('Errore durante il login:', error);
                setError(error.response.data);
              }
              setIsLoading(false);
            });
        },
    });

    useEffect(() => {
      if (success) {
          setError('Email verificata');
      }
    }, [success]);

    return (
        <Container>
            <Row className="justify-content-center" style={{ margin: '50px' }}>
                <Col md={6}>
                <h2>Accedi</h2>
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
                    <div className="text-center mt-3">
                      <Link to="/recovery-password">Recupera password</Link>
                    </div>
                    
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
                        'Accedi'
                      )}
                    </Button>
                </Form>

                <br/>
                {error && <Alert variant="danger">{error}</Alert>}
                </Col>
                {show && (
                  <>
                    <div className="d-flex justify-content-center" style={{ marginTop: '20px' }}>
                      <GoogleOAuthProvider clientId={clientId}>
                        <GoogleLogin
                          onSuccess={(values) => 
                            axios.post('https://serverbarbaropersonal.pagekite.me/users/google-login',  JSON.stringify({ tokenId: values.credential }), {
                              headers: {
                                'Content-Type': 'application/json',
                              },  
                              withCredentials: true
                            })
                            .then(response => {
                              login(response.data);
                              navigate('/');
                            })
                            .catch(error => {
                              if(error.response.status === 403) {
                                loginT(error.response.data)
                                navigate('/OTP');
                              }
                              else {
                                console.error('Errore durante il login:', error);
                                setError(error.response.data);
                              }
                            })
                          }
                          onError={() => console.log("Errore durante l'accesso")}
                        />
                      </GoogleOAuthProvider>
                    </div>
                  </>
                )}    
              </Row>
        </Container>
    );
}

export default Login;