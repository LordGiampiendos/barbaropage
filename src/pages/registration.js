import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Image, Alert, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { FaGoogle } from 'react-icons/fa';

function Registration() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const [isSameAddress, setIsSameAddress] = useState(false);
    const [show, setShow] = useState(true);

    const userAgent = navigator.userAgent;
    if (userAgent.includes('AppBarbaro')) {
        setShow(false);
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            birthDate: '',
            phoneNumber: '',
            image: null,
            addressDomicile: '',
            addressResidence: '',
            city: ''
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Il nome è obbligatorio'),
            lastName: Yup.string().required('Il cognome è obbligatorio'),
            email: Yup.string().email('Formato email non valido').required('L\'email è obbligatoria'),
            password: Yup.string().min(6, 'La password deve contenere almeno 6 caratteri').required('La password è obbligatoria'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Le password devono corrispondere').required('La conferma della password è obbligatoria'),
            birthDate: Yup.date().max(new Date(), 'La data di nascita non può essere nel futuro').required('La data di nascita è obbligatoria'),
            phoneNumber: Yup.string().matches(/^\+?[1-9]\d{1,14}$/, 'Numero di telefono non valido').required('Il numero di telefono è obbligatorio'),
            addressDomicile: Yup.string().required('L\'indirizzo di domicilio è obbligatorio'),
            addressResidence: Yup.string().required('L\'indirizzo di residenza è obbligatorio'),
            city: Yup.string().required('La città è obbligatoria'),
        }),
        onSubmit: (values) => {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("birthDate", values.birthDate);
            formData.append("phoneNumber", values.phoneNumber);
            formData.append("image", values.image);
            formData.append("addressDomicile", values.addressDomicile);
            formData.append("addressResidence", values.addressResidence);
            formData.append("city", values.city);
            
            axios.post('https://serverbarbaropersonal.pagekite.me/users/register', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then(response => {
                navigate('/login');
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Errore durante la registrazione:', error);
                setError(error.response.data);
                setIsLoading(false);
            });
        },
    });

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            formik.setFieldValue("image", file);
            setImage(previewUrl);
        }
    };

    const handleRemoveImage = () => {
        setImage('');
        document.getElementById('imageInput').value = ''; 
    };

    useEffect(() => {
        if (isSameAddress) {
            formik.setFieldValue('addressDomicile', formik.values.addressResidence);
        } else {
            formik.setFieldValue('addressDomicile', formik.values.addressDomicile);
        }
    }, [isSameAddress, formik.values]);


    const handleCheckboxChange = () => {
        setIsSameAddress(!isSameAddress);
    };
        
    return (
        <Container>
        <Row className="justify-content-center" style={{ marginTop: '50px' }}>
            <Col md={6}>
            <h2>Registrati</h2>

            <br/>
            <Form.Group controlId="formImage" style={{ display: 'flex', justifyContent: 'center' }}    >
                {image ? (
                <div className="d-flex align-items-center">
                    <Image src={image} roundedCircle style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                    <Button variant="danger" style={{ marginLeft: '20px' }} onClick={handleRemoveImage}>
                    Rimuovi
                    </Button>
                </div>
                ) : (
                <div 
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        border: '2px solid #ccc',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        cursor: 'pointer',
                        backgroundColor: '#f8f9fa',
                    }}
                    onClick={() => document.getElementById('imageInput').click()}
                >
                    <span style={{ fontSize: '24px', color: '#ccc' }}>+</span>
                </div>
                )}
                <input
                    type="file"
                    id="imageInput"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </Form.Group>

            <br/>
            <Form onSubmit={formik.handleSubmit}>
                <br/>
                <Form.Group controlId="formFirstName">
                <Form.Label>Nome*</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Inserisci il tuo nome"
                    {...formik.getFieldProps('firstName')}
                    isInvalid={formik.touched.firstName && formik.errors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.firstName}
                </Form.Control.Feedback>
                </Form.Group>

                <br/>
                <Form.Group controlId="formLastName">
                <Form.Label>Cognome*</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Inserisci il tuo cognome"
                    {...formik.getFieldProps('lastName')}
                    isInvalid={formik.touched.lastName && formik.errors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.lastName}
                </Form.Control.Feedback>
                </Form.Group>

                <br/>
                <Form.Group controlId="formEmail">
                <Form.Label>Email*</Form.Label>
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
                <Form.Group controlId="formPassword">
                <Form.Label>Password*</Form.Label>
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
                <Form.Group controlId="formConfirmPassword">
                <Form.Label>Conferma Password*</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Conferma la password"
                    {...formik.getFieldProps('confirmPassword')}
                    isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                </Form.Control.Feedback>
                </Form.Group>

                <br/>
                <Form.Group controlId="formBirthDate">
                <Form.Label>Data di nascita*</Form.Label>
                <Form.Control
                    type="date"
                    placeholder="Inserisci la data di nascita"
                    {...formik.getFieldProps('birthDate')}
                    isInvalid={formik.touched.birthDate && formik.errors.birthDate}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.birthDate}
                </Form.Control.Feedback>
                </Form.Group>

                <br/>
                <Form.Group controlId="formPhoneNumber">
                <Form.Label>Numero di telefono*</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Inserisci il numero di telefono"
                    {...formik.getFieldProps('phoneNumber')}
                    isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.phoneNumber}
                </Form.Control.Feedback>
                </Form.Group>

                <br/>
                <Form.Group controlId="formAddressResidence">
                <Form.Label>Indirizzo di residenza*</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Inserisci l'indirizzo di residenza"
                    {...formik.getFieldProps('addressResidence')}
                    isInvalid={formik.touched.addressResidence && formik.errors.addressResidence}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.addressResidence}
                </Form.Control.Feedback>
                </Form.Group>

                <br/>
                <Form.Group controlId="formSameAddress">
                <Form.Check
                    type="checkbox"
                    label="Il mio indirizzo di domicilio è uguale a quello di residenza"
                    checked={isSameAddress}
                    onChange={handleCheckboxChange}  // Cambia lo stato della checkbox
                />
                </Form.Group>

                <br/>
                <Form.Group controlId="formAddressDomicile">
                <Form.Label>Indirizzo di domicilio*</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Inserisci l'indirizzo di domicilio"
                    {...formik.getFieldProps('addressDomicile')}
                    isInvalid={formik.touched.addressDomicile && formik.errors.addressDomicile}
                    disabled={isSameAddress}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.addressDomicile}
                </Form.Control.Feedback>
                </Form.Group>

                <br/>
                <Form.Group controlId="formCity">
                <Form.Label>Città*</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Inserisci la tua città"
                    {...formik.getFieldProps('city')}
                    isInvalid={formik.touched.city && formik.errors.city}
                />
                <Form.Control.Feedback type="invalid">
                    {formik.errors.city}
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formTermsAndConditions">
                <br/>
                <br/>
                <Form.Check
                    type="checkbox"
                    label="Accetto i termini e le condizioni"
                    required
                />
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
                        'Registrati'
                    )}
                </Button>
            </Form>

            <br/>
            {error && <Alert variant="danger">{error}</Alert>}
            <br/>
            {show && (
                <>
                    <p style={{ marginTop: '10px'}}>Oppure registrati con:</p>
                    <div className="d-flex justify-content-center" style={{ marginTop: '20px' }}>
                        <LoginSocialGoogle
                        client_id="608372132439-b6gpetv4i83u76qe3rho3u4t4dfmog24.apps.googleusercontent.com"
                        scope="openid profile email"
                        onResolve={(values) => {
                            let user = {
                                "email": values.data.email, 
                                "firstName": values.data.given_name,
                                "lastName": values.data.family_name,
                                "password": '',
                                "confirmPassword": '',
                                "phoneNumber": '',
                                "image": values.data.picture,
                                "addressDomicile": '',
                                "addressResidence": '',
                                "city": '',
                                "role": ''
                            }
                            axios.post('https://serverbarbaropersonal.pagekite.me/users/registerE', user)
                                .then(response => {
                                    navigate('/login');
                                })
                                .catch(error => {
                                    console.error('Errore durante la registrazione:', error);
                                    setError(error.response.data);
                                })
                            console.log(values);
                        }}
                        onReject={(error) => {
                            console.error(error);
                        }}
                        >
                        <Button variant="danger">
                            <FaGoogle style={{ fontSize: 'large' }} />
                        </Button>
                        </LoginSocialGoogle>
                    </div>
                </>
            )}
            </Col>
        </Row>
        <br/>
        <br/>
        </Container>
    );
}

export default Registration;
