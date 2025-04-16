import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Image, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../pages/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProfilePage() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleEditProfile = () => {
        navigate('/edit-profile'); 
    };

    const handleEditEmail = () => {
        setIsLoading(true);
        axios.post('https://serverbarbaropersonal.pagekite.me/users/edit-email-google', 0, {withCredentials: true})
        .then(response => {
            navigate('/edit-email');
            setIsLoading(false);
        })
        .catch(error => {
            console.error('Errore durante la modifica dell\'email:', error);
            setError(error.response.data);
            setIsLoading(false);
        }); 
    };

    const handleEditSecurity = () => {
        navigate('/edit-security'); 
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
                    <br/>
                    {user.image ? (
                        <div>
                            <Image src={user.image} roundedCircle style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
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
                                backgroundColor: '#f8f9fa',
                                margin: 'auto'
                            }}
                        >
                        <span style={{ fontSize: 'small', color: '#ccc' }}>Aggiungi un'immagine</span>
                        </div>
                    )}
                    <br/>
                    <Card.Title>{ user.firstName} {user.lastName}</Card.Title>
                    <br/>
                    <Button variant="primary" onClick={handleEditEmail}>
                        {isLoading ? (
                            <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            />
                        ) : (
                            'Modifica Email'
                        )}
                    </Button>
                    <br/>
                    <br/>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <br/>
                    <Button variant="primary" onClick={handleEditSecurity}>Impostazioni di Sicurezza</Button>
                    <br/>
                    <br/>
                    </Card.Body>
                </Card>
                </Col>
                <Col md={8}>
                <Card>
                    <Card.Body>
                    <Card.Title style={{marginTop: '15px', marginBottom: '30px'}}>Informazioni Personali</Card.Title>
                    <Row>
                        <Col sm={4}>
                        <strong>Email:</strong>
                        </Col>
                        <Col sm={8}>
                        {user.email}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm={4}>
                        <strong>Data di Nascita:</strong>
                        </Col>
                        <Col sm={8}>
                            {user.birthDate ? (
                                <div>
                                    {user.birthDate}
                                </div>) : (
                                <div>
                                    Inserisci data di nascita
                                </div>
                                )
                            }
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm={4}>
                        <strong>Località:</strong>
                        </Col>
                        <Col sm={8}>
                            {user.city ? (
                                <div>
                                    {user.city}
                                </div>) : (
                                <div>
                                    Inserisci città di residenza
                                </div>
                                )
                            }
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm={4}>
                        <strong>Numero di telefono:</strong>
                        </Col>
                        <Col sm={8}>
                            {user.phoneNumber ? (
                                <div>
                                    {user.phoneNumber}
                                </div>) : (
                                <div>
                                    Inserisci numero di telefono
                                </div>
                                )
                            }
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm={4}>
                        <strong>Indirizzo di residenza:</strong>
                        </Col>
                        <Col sm={8}>
                            {user.addressResidence ? (
                                <div>
                                    {user.addressResidence}
                                </div>) : (
                                <div>
                                    Inserisci indirizzo di residenza
                                </div>
                                )
                            }
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col sm={4}>
                        <strong>Indirizzo di domicilio:</strong>
                        </Col>
                        <Col sm={8}>
                            {user.addressDomicile ? (
                                <div>
                                    {user.addressDomicile}
                                </div>) : (
                                <div>
                                    Inserisci indirizzo di domicilio
                                </div>
                                )
                            }
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <Button variant="primary" onClick={handleEditProfile}>Modifica Profilo</Button>
                    <br/>
                    <br/>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            </Container>
        );
    };
}

export default ProfilePage;