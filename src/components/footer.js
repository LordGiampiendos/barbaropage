import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaTiktok, FaYoutube, FaLinkedin, FaGithub } from 'react-icons/fa';
import './footer.css';

function Footer() {
    return (
        <footer>
            <Container>
                <Row className='mb-3'>
                    <Col md={5}>
                        <br />
                        <h5 className='hs' >Contatti</h5>
                        <ListGroup variant="flush">
                            <ListGroup.Item style={{ backgroundColor: '#333', border: 'none', color: '#fff' }}>
                                <a href="tel:+393272675374" style={{ color: '#fff', textDecoration: 'none' }}>
                                    <FaPhoneAlt /> <strong>Telefono:</strong> 3272675374
                                </a>
                            </ListGroup.Item>
                            <ListGroup.Item style={{ backgroundColor: '#333', border: 'none', color: '#fff' }}>
                                <a href="mailto:giampiero12345678@hotmail.it" style={{ color: '#fff', textDecoration: 'none' }}>
                                    <FaEnvelope /> <strong>Email principale:</strong> giampiero12345678@hotmail.it
                                </a>
                            </ListGroup.Item>
                            <ListGroup.Item style={{ backgroundColor: '#333', border: 'none', color: '#fff' }}>
                                <a href="mailto:giampierobarbaro81@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>
                                    <FaEnvelope /> <strong>Email secondaria:</strong> giampierobarbaro81@gmail.com
                                </a>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>

                    <Col md={3}>
                        <br />
                        <h5>Seguimi</h5>
                        <div>
                            <a href="https://www.instagram.com/giampierobarbaro" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 10px' }}>
                                <FaInstagram size={24} />
                            </a>
                            <a href="https://www.tiktok.com/@giampiero385" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 10px' }}>
                                <FaTiktok size={24} />
                            </a>
                            <a href="https://www.youtube.com/@giampierobarbaro2152" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 10px' }}>
                                <FaYoutube size={24} />
                            </a>
                            <a href="https://it.linkedin.com/in/giampiero-barbaro-8368162b1" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 10px' }}>
                                <FaLinkedin size={24} />
                            </a>
                            <a href="https://github.com/LordGiampiendos" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', margin: '0 10px' }}>
                                <FaGithub size={24} />
                            </a>
                        </div>
                    </Col>

                    <Col md={4}>
                        <br />
                        <h5>Informazioni Utili</h5>
                        <p><strong>Data di Nascita: </strong>29 Luglio 1999</p>
                        <p><strong>Cittadinanza: </strong>Italiana</p>
                        <p><strong>CAP: </strong>90138 Palermo (PA)</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}


export default Footer;

