import React, { useRef, useEffect } from 'react'
import { Container, Row, Col, Card, ListGroup, Carousel } from 'react-bootstrap';
import { useAuth } from '../pages/context/AuthContext';

function Home() {
    const { user } = useAuth();

    function CorporationIframe({ demoUrl }) {
        const iframeRef = useRef(null);

        useEffect(() => {
            const iframe = iframeRef.current;
            if (iframe) {
                const origin = new URL(demoUrl).origin;
                iframe.onload = () => {
                    iframe.contentWindow?.postMessage({ type: "HIDE_COOKIES_BANNER" }, origin);
                };
            }
        }, [demoUrl]);

        return (
            <iframe
                ref={iframeRef}
                src={demoUrl}
                width="100%"
                height="250px"
                title="Corporation"
                style={{ border: '1px solid #ddd', borderRadius: '8px' }}
            />
        );
    }

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

            <Row className="justify-content-center my-4">
                <Col md={9}>
                    <Card className="border-primary shadow-sm bg-light rounded">
                        <Card.Body className="text-center p-4">
                            <h2 className="text-primary mb-3 fw-semibold">Chi Sono</h2>
                            <p>
                                Io sono <strong>Giampiero Barbaro</strong>, laureato alla magistrale di ingegneria informatica dell'Università di Palermo.
                                Sono un esperto ed appassionato che lavora per creare soluzioni innovative e personalizzate per ogni cliente.<br />Attualmente lavoro come Tech Consulting alla Lipari Consulting.
                            </p>
                            <p>
                                Non mi occupo solo di <strong>siti web</strong>, ma anche di <strong>mobile</strong>, soluzioni <strong>hardware</strong> ed <strong>embedded</strong>.
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={4} style={{ marginLeft: "auto" }}>
                    <Card className="mb-4 shadow-lg">
                        <Card.Img variant="top" src="tesi.jpg" />
                        <Card.Body>
                            <Card.Title className="text-center fs-4 fw-semibold mb-4 mt-2">
                                Guadagnare, imparare, applicare e responsabilizzare
                            </Card.Title>

                            <Row className="text-center mb-4">
                                <Col md={4}>
                                    <i className="bi bi-globe fs-1 text-info" />
                                    <h4 className="mt-2">4</h4>
                                    <p>Siti Web Creati</p>
                                </Col>
                                <Col md={4}>
                                    <i className="bi bi-phone fs-1 text-success" />
                                    <h4 className="mt-2">2</h4>
                                    <p>App Create</p>
                                </Col>
                                <Col md={4}>
                                    <i className="bi bi-cpu fs-1 text-danger" />
                                    <h4 className="mt-2">5</h4>
                                    <p>Computer Assemblati</p>
                                </Col>
                            </Row>

                            <p className="text-center fst-italic mb-4">
                                Mi impegno costantemente per eccellere in ogni compito che mi viene affidato, cercando di superare
                                le aspettative e affrontare le sfide con determinazione e creatività.
                            </p>

                            <hr />

                            <h5 className="text-center fw-semibold mt-4">Percorso Accademico</h5>
                            <ul className="timeline">
                                <li>
                                    <strong>2025</strong> – <u>Laurea Magistrale in Ingegneria Informatica</u> – Università di Palermo<br />
                                    Voto: <strong>🎯110 e Lode</strong><br />
                                    🏆Grande soddisfazione inaspettata ma gradita
                                </li>
                                <li>
                                    <strong>2022</strong> – <u>Laurea Triennale in Ingegneria Informatica</u> – Università di Palermo<br />
                                    Voto: <strong>🎯88/110</strong><br />
                                    🎓Primo ingegnere della mia famiglia
                                </li>
                                <li>
                                    <strong>2018</strong> – <u>Diploma di Maturità</u> presso Liceo Scientifico Benedetto Croce<br />
                                    Voto: <strong>🎯75/100</strong><br />
                                    📌Primo esame fallito della mia vita
                                </li>
                            </ul>

                            <hr />

                            <h5 className="fw-semibold mt-4">Tesi di Laurea</h5>
                            <p><strong>Titolo:</strong> Analisi comparativa e fine-tuning di Large Language Models per il Question-Answering in italiano sull’offerta formativa di Ateneo</p>
                            <p><strong>Materia:</strong> BIG-DATA</p>
                            <p><strong>Relatore:</strong> PIRRONE ROBERTO</p>
                            <p>
                                La tesi mi ha consentito di approfondire il campo del deep learning, con particolare attenzione ai Large Language Models,
                                concentrandomi sulle tecniche di inferenza (<em>in-context learning</em>) e fine-tuning (<strong>PEFT</strong>, <strong>LoRA</strong>, <strong>QLoRA</strong>, ecc.).
                            </p>
                        </Card.Body>
                    </Card>
                    <Card className="mb-4 shadow-lg">
                        <Card.Body>
                            <Card.Title className="fw-semibold mb-3">
                                Le Mie Lingue
                            </Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <i className="bi bi-flag text-muted me-2" /> 🇬🇧 Inglese – <strong>B1/B2</strong> (intermedio)
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <i className="bi bi-flag text-muted me-2" /> 🇫🇷 Francese – <strong>A1</strong> (pieno)
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <i className="bi bi-flag text-muted me-2" /> 🇪🇸 Spagnolo – <strong>A1</strong> (pieno)
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <i className="bi bi-flag text-muted me-2" /> 🇩🇪 Tedesco – <strong>Livello base</strong>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <i className="bi bi-flag text-muted me-2" /> 🇨🇳 Cinese – <strong>Livello base</strong>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                    <Card className="mb-4 shadow-lg">
                        <Card.Body className="text-center">
                            <Card.Title className="fw-semibold mb-3">
                                Patente di Guida
                            </Card.Title>
                            <Card.Text>
                                Possiedo la <strong>Patente B</strong>, valida su tutto il territorio nazionale ed europeo.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="mb-4 shadow-lg">
                        <Card.Body>
                            <Card.Title className='fw-semibold mb-3'>
                                Attività Sportive
                            </Card.Title>
                            <Card.Text>
                                Mi dedico con passione all'allenamento con i pesi, seguendo uno stile amatoriale di powerlifting e streetlifting. L'obiettivo è migliorare la forza, la resistenza e la tecnica, con un focus particolare sullo sviluppo di un fisico equilibrato e funzionale.
                            </Card.Text>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <i className="bi bi-person-fill text-muted me-2" /> 🏋️‍♂️ Allenamento Pesistica – <strong>Powerlifting & Streetlifting</strong>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <i className="bi bi-calendar-date text-muted me-2" /> ⏰ Allenamenti Settimanali – 3/4 giorni a settimana
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <i className="bi bi-bar-chart-line text-muted me-2" /> 📊 Progressi – Focus su forza e miglioramento continuo nelle alzate principali
                                </ListGroup.Item>
                            </ListGroup>
                            <hr />
                            <p className="text-center fst-italic mb-4">
                                Lo sport non è solo una passione, ma un modo per mettermi alla prova ogni giorno, superando limiti fisici e mentali, cercando sempre di eccellere.
                            </p>
                        </Card.Body>
                    </Card>
                    <Card className="mb-4 shadow-lg">
                        <Card.Body>
                            <Card.Title className="fw-semibold mb-4">
                                Esperienze Lavorative
                            </Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="py-3 border-0 shadow-sm rounded-3 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="text-dark"><strong>Ruolo:</strong> Tech Consulting</h5>
                                        <span className="badge bg-secondary">Lipari Consulting</span>
                                    </div>
                                    <p className="mt-2 text-muted">
                                        <strong>Descrizione:</strong> Attività di analisi, implementazione e ottimizzazione di soluzioni tecnologiche per aziende di diverse dimensioni e settori.
                                    </p>
                                </ListGroup.Item>
                                <ListGroup.Item className="py-3 border-0 shadow-sm rounded-3 mb-3">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="text-dark"><strong>Ruolo:</strong> Tutor per studenti diversamente abili e neurodiversi</h5>
                                        <span className="badge bg-secondary">Università degli Studi di Palermo</span>
                                    </div>
                                    <p className="mt-2 text-muted">
                                        <strong>Descrizione:</strong> Attività di supporto personalizzato per studenti con bisogni educativi speciali, contribuendo alla piena inclusione accademica.
                                    </p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={5} style={{ marginRight: "auto" }}>
                    <Card className="mb-4 shadow-lg">
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="raspberry.jpg"
                                    alt="Terza immagine"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="latenza.jpg"
                                    alt="Seconda immagine"
                                />
                            </Carousel.Item>
                        </Carousel>
                        <Card.Body className='mt-2' >
                            <Card.Title className='fw-semibold' >Le Mie Competenze</Card.Title>
                            <br />
                            <Card.Text>
                                <ListGroup>
                                    <ListGroup.Item>Office Suite (Word, Power Point, Excel)</ListGroup.Item>
                                    <ListGroup.Item>Web Browser (Basic Browser, Tor Browser, Strumenti Di Sviluppo Web)</ListGroup.Item>
                                    <ListGroup.Item>CAD</ListGroup.Item>
                                    <ListGroup.Item>HTML / CSS</ListGroup.Item>
                                    <ListGroup.Item>Assembly</ListGroup.Item>
                                    <ListGroup.Item>Forth</ListGroup.Item>
                                    <ListGroup.Item>C / C++</ListGroup.Item>
                                    <ListGroup.Item>Scrum Fundamentals Certified (SFC™) (Livello Base)</ListGroup.Item>
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
                    <Card className="mb-4 shadow-lg">
                        <Card.Img variant="top" src="laurea.jpg" />
                        <Card.Body>
                            <Card.Title className='fw-semibold' >La Mia Missione</Card.Title>
                            <Card.Text>
                                Offrire soluzioni pratiche e avanzate, sempre al passo con le ultime tendenze del mercato.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="mb-4 shadow-lg">
                        <Card.Body>
                            <Card.Img variant="top" src="barbaroapp_qrcode.jpg" />
                            <Card.Title className='fw-semibold' >App Personale</Card.Title>
                            <Card.Text>
                                Scansiona il codice QR con il tuo smartphone per scaricare l'App.
                                (solo Android)
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="mb-4 shadow-lg">
                        <Card.Body>
                            <div style={{ marginBottom: "10px" }}>
                                <CorporationIframe key={0} demoUrl="https://corporationpage.vercel.app" />
                            </div>
                            <Card.Title className='fw-semibold' >Corporation</Card.Title>
                            <Card.Text>
                                Sito Web Aziendale
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}


export default Home;
