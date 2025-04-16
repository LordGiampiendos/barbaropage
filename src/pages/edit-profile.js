import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Image, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../pages/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function EditProfilePage() {
    const { user, login } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(user ? user.image: '');
    const [isSameAddress, setIsSameAddress] = useState(false);
    const [error, setError] = useState('');

    const formik = useFormik({
        initialValues: {
            firstName: user ? user.firstName: '',
            lastName: user ? user.lastName: '',
            city: user ? user.city: '',
            birthDate: user ? user.birthDate: '',
            phoneNumber: user ? user.phoneNumber: '',
            addressResidence: user ? user.addressResidence: '',
            addressDomicile: user ? user.addressDomicile: '',
            image: user ? user.image: null,
            imageURL: user ? user.image: null
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('Il nome è obbligatorio'),
            lastName: Yup.string().required('Il cognome è obbligatorio'),
            phoneNumber: Yup.string().matches(/^\+?[1-9]\d{1,14}$/, 'Numero di telefono non valido').required('Il numero di telefono è obbligatorio'),
            addressDomicile: Yup.string().required('L\'indirizzo di domicilio è obbligatorio'),
            addressResidence: Yup.string().required('L\'indirizzo di residenza è obbligatorio'),
            city: Yup.string().required('La città è obbligatoria'),
            birthDate: Yup.date().max(new Date(), 'La data di nascita non può essere nel futuro').optional(),
        }),
        onSubmit: (values) => {
            setIsLoading(true);
            const formData = new FormData();
            formData.append("firstName", values.firstName);
            formData.append("lastName", values.lastName);
            formData.append("password", values.password);
            formData.append("birthDate", values.birthDate);
            formData.append("phoneNumber", values.phoneNumber);
            if (typeof values.image === 'string') {
                formData.append("imageURL", values.image);
            }
            else {
                formData.append("image", values.image);
            }
            formData.append("addressDomicile", values.addressDomicile);
            formData.append("addressResidence", values.addressResidence);
            formData.append("city", values.city);
            
            axios.post('https://serverbarbaropersonal.pagekite.me/users/profile', formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            })
            .then(response => {
                login(response.data);
                navigate('/profile');
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Errore nell\'invio dei dati:', error);
                setError(error.response.data);
                setIsLoading(false);
            });
        },
    });

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            formik.setFieldValue("image", file);
            setImagePreview(previewUrl);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview('');
        formik.setFieldValue("image", '');
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

    if (!user) {
        return <div>Caricamento...</div>;
    }
    else {
        return (
            <Container className="mt-5 mb-5">
                <Row>
                    <Col md={4} className="text-center">
                        <Card>
                            <Card.Body>
                                <br />
                                {imagePreview ? (
                                    <div>
                                        <Image src={imagePreview} roundedCircle style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
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
                                            margin: 'auto'
                                        }}
                                        onClick={() => document.getElementById('imageInput').click()}
                                    >
                                        <span style={{ fontSize: '24px', color: '#ccc' }}>+</span>
                                    </div>
                                )}
                                <br />
                                <input
                                    type="file"
                                    id="imageInput"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <Card.Title>{formik.values.firstName} {formik.values.lastName}</Card.Title>
                                <br />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <br/>
                                <Card.Title>Modifica Informazioni Personali</Card.Title>
                                <br/>
                                <Form noValidate onSubmit={formik.handleSubmit}>
                                    <Form.Group as={Row} controlId="formFirstName">
                                        <Form.Label column sm={4}>Nome:</Form.Label>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                value={formik.values.firstName}
                                                onChange={formik.handleChange}
                                                isInvalid={formik.touched.firstName && formik.errors.firstName}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.firstName}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formLastName">
                                        <Form.Label column sm={4}>Cognome:</Form.Label>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                value={formik.values.lastName}
                                                onChange={formik.handleChange}
                                                isInvalid={formik.touched.lastName && formik.errors.lastName}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.lastName}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formCity">
                                        <Form.Label column sm={4}>Località:</Form.Label>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="text"
                                                name="city"
                                                value={formik.values.city}
                                                onChange={formik.handleChange}
                                                isInvalid={formik.touched.city && formik.errors.city}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.city}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formBirthDate">
                                        <Form.Label column sm={4}>Data di nascita</Form.Label>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="date"
                                                name="birthDate"
                                                value={formik.values.birthDate}
                                                onChange={formik.handleChange}
                                                isInvalid={formik.touched.birthDate && formik.errors.birthDate}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.birthDate}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formPhoneNumber">
                                        <Form.Label column sm={4}>Telefono:</Form.Label>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="text"
                                                name="phoneNumber"
                                                value={formik.values.phoneNumber}
                                                onChange={formik.handleChange}
                                                isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.phoneNumber}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} controlId="formAddressResidence">
                                        <Form.Label column sm={4}>Indirizzo di residenza:</Form.Label>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="text"
                                                name="addressResidence"
                                                value={formik.values.addressResidence}
                                                onChange={formik.handleChange}
                                                isInvalid={formik.touched.addressResidence && formik.errors.addressResidence}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.addressResidence}
                                            </Form.Control.Feedback>
                                        </Col>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group as={Row} controlId="formSameAddress">
                                    <Form.Label column sm={4}></Form.Label>
                                        <Col sm={8}>
                                            <Form.Check
                                                type="checkbox"
                                                label="Il mio indirizzo di domicilio è uguale a quello di residenza"
                                                checked={isSameAddress}
                                                onChange={handleCheckboxChange}
                                            />
                                        </Col>
                                    </Form.Group>
                                    <br/>
                                    <Form.Group as={Row} controlId="formAddressDomicile">
                                        <Form.Label column sm={4}>Indirizzo di domicilio:</Form.Label>
                                        <Col sm={8}>
                                            <Form.Control
                                                type="text"
                                                name="addressDomicile"
                                                value={formik.values.addressDomicile}
                                                onChange={formik.handleChange}
                                                isInvalid={formik.touched.addressDomicile && formik.errors.addressDomicile}
                                                disabled={isSameAddress}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {formik.errors.addressDomicile}
                                            </Form.Control.Feedback>
                                        </Col>
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
                                            'Salva Modifiche'
                                        )}
                                    </Button>
                                    <br/>
                                    <br/>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    <br/>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    };
}

export default EditProfilePage;
