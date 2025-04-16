import React from 'react'
import { Container, Row, Col, Card, ListGroup, Carousel } from 'react-bootstrap';
import { useAuth } from '../pages/context/AuthContext';

function Home() {    
    const { user } = useAuth();

    return (
        <Container className="mt-5">

        {user && (
            <Row className="mb-4 justify-content-center">
                <Col md={8} className="text-center greeting-box">
                    <h2 className="greeting-title">Benvenuto, {user.firstName}!</h2>
                    <p className="greeting-message">Grazie per esserti registrato e per aver visitato il mio sito! Sono felice che tu abbia deciso di esplorare i miei progetti. Spero che troverai ciò che stai cercando.</p>
                </Col>
            </Row>
        )}

        <Row>
            <Col md={12} className="text-center">
            <h1>Chi Sono</h1>
            <p style={{marginTop: '25px'}}>
                Io sono Giampiero Barbaro, laureato alla magistrale di ingegneria informatica dell'università di Palermo.
                Sono un esperto ed appassionato che lavora per creare soluzioni innovative e personalizzate per ogni cliente.
                Non mi occupo solo di siti web, ma anche di mobile, soluzioni hardware ed embedded.
            </p>
            <br/>
            </Col>
        </Row>

        <Row className="mt-4">
            <Col md={4} style={{ marginLeft: "auto"}}>
            <Card className="mb-4">
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="tesi.jpg"
                        alt="Prima immagine"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="latenza.jpg"
                        alt="Seconda immagine"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="raspberry.jpg"
                        alt="Terza immagine"
                        />
                    </Carousel.Item>
                </Carousel>
                <Card.Body>
                <br/>
                <Card.Title>Le Mie Competenze</Card.Title>
                <br/>
                <Card.Text>
                <ListGroup>
                    <ListGroup.Item>Office Suite (Word, Power Point, Excel)</ListGroup.Item>
                    <ListGroup.Item>Web Browser (Basic Browser, Tor Browser, Strumenti Di Sviluppo Web)</ListGroup.Item>
                    <ListGroup.Item>CAD</ListGroup.Item>
                    <ListGroup.Item>HTML / CSS</ListGroup.Item>
                    <ListGroup.Item>Assembly</ListGroup.Item>
                    <ListGroup.Item>Forth</ListGroup.Item>
                    <ListGroup.Item>C / C++</ListGroup.Item>
                    <ListGroup.Item>Java / Java Enterprise / Jakarta (Jsp, Servlet, Spring Boot, Spring Security)</ListGroup.Item>
                    <ListGroup.Item>PHP / Javascript (React, React Native, Bootstrap)</ListGroup.Item>
                    <ListGroup.Item>Python (IA generativa (LLAMA, PHI, ecc...), Machine Learning, Deep Learning, Transformers, Reti Convoluzionali)</ListGroup.Item>
                    <ListGroup.Item>Microsoft Windows (Terminale, Registro, Gestione Avanzata Della Sicurezza (Liste di controllo degli accessi, Ruoli, ecc...), Backup, Rispristino, ecc...)</ListGroup.Item>
                    <ListGroup.Item>Linux (Idem Come Windows)</ListGroup.Item>
                    <ListGroup.Item>Android (Terminale, Modifica e Firma APK, Applicazione Web Mobile, Root, Sviluppo, ecc...)</ListGroup.Item>
                    <ListGroup.Item>DBMS (MySQL, MongoDB)</ListGroup.Item>
                    <ListGroup.Item>GitHub</ListGroup.Item>
                    <ListGroup.Item>Hardware (Desktop, Laptop, Smartphone, Raspberry)</ListGroup.Item>
                </ListGroup>
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col md={5} style={{ marginRight: "auto" }}>
            <Card className="mb-4">
                <Card.Img variant="top" src="laurea.jpg" />
                <Card.Body>
                <Card.Title>La Mia Missione</Card.Title>
                <Card.Text>
                    Offrire soluzioni pratiche e avanzate, sempre al passo con le ultime tendenze del mercato.
                </Card.Text>
                </Card.Body>
            </Card>
            <Card className="mb-4">
                <Card.Img variant="top" src="amministratore.jpg" />
                <Card.Body>
                <Card.Title>Perché Sei Finito In Questa Pagina</Card.Title>
                <Card.Text>
                    Hai visto il mio curriculum ed eri curioso.
                    La mia esperienza e la mia dedizione fanno la differenza. Punto alla qualità e all'innovazione
                    in ogni progetto.
                </Card.Text>
                </Card.Body>
            </Card>
            </Col>
        </Row>
        </Container>
    );
}

export default Home;