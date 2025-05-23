import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Alert, Form, Spinner, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { useAuth } from '../pages/context/AuthContext';

function SecurityPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isMFA, setIsMFA] = useState(false);
    const [qrUrl, setQrUrl] = useState('');
    const [secret, setSecret] = useState('');
    const [error, setError] = useState(null);
    const { user, login } = useAuth();
    const [mfaCode, setMfaCode] = useState('');
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user.email) {
            axios.post('https://serverbarbaropersonal.pagekite.me/users/edit-email-google', 0, { withCredentials: true })
                .then(response => {
                    setIsPassword(true);
                })
                .catch(error => {
                    setIsPassword(false);
                });

            axios.post('https://serverbarbaropersonal.pagekite.me/users/MFA', 0, { withCredentials: true })
                .then(response => {
                    setIsMFA(true);
                })
                .catch(error => {
                    setIsMFA(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [user]);

    const generateQRCode = () => {
        axios.get("https://serverbarbaropersonal.pagekite.me/mfa/generate-qr", { withCredentials: true })
            .then(response => {
                setQrUrl(response.data);
                let regex = /[?&]secret=([^&]*)/;
                let match = (response.data).match(regex);
                let parametro = match ? match[1] : null;
                setSecret(parametro);
            })
            .catch(err => {
                setError('Errore nel recupero del QR Code');
            });
    };

    const verifyMFA = () => {
        if (mfaCode) {
            setIsLoading(true);
            axios.post("https://serverbarbaropersonal.pagekite.me/mfa/verify-code", { code: mfaCode }, { withCredentials: true })
                .then(response => {
                    if (response.data) {
                        login(response.data);
                        setShowModal1(false);
                        setIsMFA(true);
                    } else {
                        setError('Codice non valido');
                    }
                    setIsLoading(false);
                })
                .catch(err => {
                    setError('Errore nella verifica del codice MFA');
                    console.error(err);
                    setIsLoading(false);
                });
        } else {
            setError('Per favore inserisci un codice MFA.');
        }
    };

    const handleEditPassword = () => {
        navigate('/edit-password');
    };

    const handleInsertPassword = () => {
        navigate('/insert-password');
    };

    const handleOffMFA = () => {
        setIsLoading(true);
        axios.post('https://serverbarbaropersonal.pagekite.me/mfa/off', 0, { withCredentials: true })
            .then(response => {
                login(response.data);
                setShowModal2(false);
                setIsMFA(false);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Errore durante la disattivazione della MFA:', error);
                setIsLoading(false);
            });
    };

    const copiaInClipboard = () => {
        if (secret) {
            navigator.clipboard.writeText(secret).then(() => {
                setCopied(true);
            });
        }
    };

    const LoadingScreen = () => {
        return (
            <Container className="mt-5 mb-5">
                <h2>Sicurezza</h2>
                <br />
                <br />
                <Row>
                    <Col md={4} className="text-center">
                        <Card>
                            <Card.Body>
                                <Card.Title style={{ marginTop: '15px' }}>Password</Card.Title>
                                <br />
                                <div className="d-flex justify-content-center align-items-center">
                                    <Spinner animation="border" variant="primary" size="lg" />
                                </div>
                                <br />
                                <br />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={8} className="text-center">
                        <Card>
                            <Card.Body>
                                <Card.Title style={{ marginTop: '15px' }}>Autenticazione multi-fattore</Card.Title>
                                <br />
                                <div className="d-flex justify-content-center align-items-center">
                                    <Spinner animation="border" variant="primary" size="lg" />
                                </div>
                                <br />
                                <br />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <Container className="mt-5 mb-5">
            <h2>Sicurezza</h2>
            <br />
            <br />
            <Row>
                <Col md={4} className="text-center">
                    <Card>
                        <Card.Body>
                            <Card.Title style={{ marginTop: '15px' }}>Password</Card.Title>
                            <br />
                            {isPassword ? (
                                <Button variant="primary" onClick={handleEditPassword}>Modifica password</Button>
                            ) : (
                                <Button variant="primary" onClick={handleInsertPassword}>Inserisci password</Button>
                            )}
                            <br />
                            <br />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8} className="text-center">
                    <Card>
                        <Card.Body>
                            <Card.Title style={{ marginTop: '15px' }}>Autenticazione multi-fattore</Card.Title>
                            <br />
                            <Row>
                                <Col sm={6} style={{ marginTop: '10px' }}>
                                    <strong>Autenticazione con app:</strong>
                                </Col>
                                <Col sm={6}>
                                    {isMFA ? 'Attivata' : 'Dissattivata'}
                                    <img src='icons1.png' style={{ marginLeft: '15px' }} alt="Status MFA" />
                                </Col>
                            </Row>
                            <br />
                            {isMFA ? (
                                <Button variant="primary" onClick={() => setShowModal2(true)}>Dissattiva MFA</Button>
                            ) : (
                                <Button variant="primary" onClick={() => {
                                    generateQRCode();
                                    setShowModal1(true);
                                }}>Attiva MFA</Button>
                            )}
                            <br />
                            <br />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal className="text-center" show={showModal1} onHide={() => setShowModal1(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Imposta Autenticazione a Due Fattori</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {qrUrl ? (
                        <div>
                            <p>Scansiona il QR Code con la tua app di autenticazione:</p>
                            <QRCodeCanvas value={qrUrl} size={256} />  {/* Usa QRCodeCanvas */}
                            <InputGroup className="mt-2">
                                <Form.Control
                                    type="text"
                                    value={secret}
                                    readOnly
                                    style={{ marginBottom: '10px' }}
                                />
                                {!copied ? (
                                    <Button variant="success" onClick={copiaInClipboard} style={{ height: '38px' }}>
                                        Copia Codice
                                    </Button>
                                ) : (
                                    <Button variant="success" onClick={copiaInClipboard} style={{ height: '38px' }}>
                                        Copiato
                                    </Button>
                                )
                                }
                            </InputGroup>
                            <Form.Group controlId="mfaCode" style={{ marginTop: "15px", marginBottom: "15px" }}>
                                <Form.Label>Inserisci il codice MFA</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={mfaCode}
                                    onChange={(e) => setMfaCode(e.target.value)}
                                    placeholder="Codice MFA"
                                    style={{ textAlign: "center" }}
                                />
                            </Form.Group>
                        </div>
                    ) : (
                        <p>Caricamento QR Code...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal1(false)}>
                        Chiudi
                    </Button>
                    <Button variant="primary" onClick={verifyMFA}>
                        {isLoading ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            'Verifica Codice'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModal2} onHide={() => setShowModal2(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Disattivazione MFA</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Sei sicuro di voler disattivare l'autenticazione a due fattori?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal2(false)}>Annulla</Button>
                    <Button variant="danger" onClick={handleOffMFA}>
                        {isLoading ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        ) : (
                            'Disattiva MFA'
                        )}
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default SecurityPage;
