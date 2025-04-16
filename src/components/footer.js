import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaTiktok, FaYoutube, FaLinkedin, FaGithub } from 'react-icons/fa';
import './footer.css';

function Footer() {
    return (
        <footer>
            <Container>
            <Row>
                <Col md={4}>
                <br/>
                <h5>Contatti</h5>
                <ListGroup variant="flush">
                    <ListGroup.Item style={{ backgroundColor: '#333', border: 'none', color: '#fff' }}>
                        <a href="tel:+3272675374" style={{ color: '#fff', textDecoration: 'none' }}>
                        <FaPhoneAlt /> <strong>Telefono:</strong> 3272675374
                        </a>
                    </ListGroup.Item>
                    <ListGroup.Item style={{ backgroundColor: '#333', border: 'none', color: '#fff' }}>
                        <a href="mailto:giampierobarbaro81@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>
                        <FaEnvelope /> <strong>Email:</strong> giampierobarbaro81@gmail.com
                        </a>
                    </ListGroup.Item>
                </ListGroup>
                </Col>
    
                <Col md={4}>
                <br/>
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
                <br/>
                <h5>Indirizzo</h5>
                <p>
                    <a href="https://www.google.com/maps?q=Via+Cardinale+Tomasi,+25" target="_blank" style={{ color: '#fff', textDecoration: 'none' }}>
                        Via Cardinale Tomasi, 25
                    </a>
                </p>
                <p>90138 Palermo (PA)</p>
                <p>Italia</p>
                </Col>
            </Row>
            </Container>
        </footer>
    );
}

export default Footer;