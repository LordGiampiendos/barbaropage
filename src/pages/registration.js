import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Image, Alert, Spinner, Modal } from 'react-bootstrap';
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
    const [showModal, setShowModal] = useState(false);
    const [showModalP, setShowModalP] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent;
        if (userAgent.includes('AppBarbaro')) {
            setShow(false);
        }
    }, []);

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

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => setShowModal(false);

    const handleShowPrivacy = () => {
        setShowModalP(true);
    };

    const handleClosePrivacy = () => {
        setShowModalP(false);
    };

    return (
        <Container>
            <Row className="justify-content-center" style={{ marginTop: '50px' }}>
                <Col md={6}>
                    <h2>Registrati</h2>

                    <br />
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

                    <br />
                    <Form onSubmit={formik.handleSubmit}>
                        <br />
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

                        <br />
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

                        <br />
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

                        <br />
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

                        <br />
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

                        <br />
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

                        <br />
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

                        <br />
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

                        <br />
                        <Form.Group controlId="formSameAddress">
                            <Form.Check
                                type="checkbox"
                                label="Il mio indirizzo di domicilio è uguale a quello di residenza"
                                checked={isSameAddress}
                                onChange={handleCheckboxChange}  // Cambia lo stato della checkbox
                            />
                        </Form.Group>

                        <br />
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

                        <br />
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
                            <br />
                            <br />
                            <Form.Check
                                type="checkbox"
                                label={
                                    <>
                                        <a href="#" onClick={handleOpenModal}>Accetto i termini e le condizioni</a>
                                    </>
                                }
                                required
                            />
                            <br />
                        </Form.Group>

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

                    <br />
                    {error && <Alert variant="danger">{error}</Alert>}
                    <br />
                    {show && (
                        <>
                            <p style={{ marginTop: '10px' }}>Oppure registrati con:</p>
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
                                        <FaGoogle style={{ fontSize: 'large', verticalAlign: 'sub' }} />
                                    </Button>
                                </LoginSocialGoogle>
                            </div>
                        </>
                    )}
                </Col>
            </Row>

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Termini e Condizioni</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Benvenuto su mio sito! Prima di registrarti e utilizzare il nostro sito, ti preghiamo di leggere attentamente i seguenti Termini e Condizioni.</p>

                    <h6>1. <strong>Introduzione</strong></h6>
                    <p>Questi Termini e Condizioni regolano l'accesso e l'utilizzo del sito web. Registrandoti sul nostro sito, accetti di essere vincolato da questi Termini e Condizioni. Se non accetti i termini, ti invitiamo a non registrarti e non utilizzare il Sito.</p>

                    <h6>2. <strong>Utilizzo del sito</strong></h6>
                    <p>Il Sito è progettato per offrire una presentazione delle mie capacità e conoscenze. Alcune risorse potrebbero essere accessibili solo agli utenti registrati. L'accesso a queste risorse è riservato a chi ha completato correttamente la registrazione e ha accettato questi Termini.</p>

                    <h6>3. <strong>Registrazione e Account</strong></h6>
                    <p>Durante il processo di registrazione, l'utente fornirà informazioni accurate, complete e veritiere. Sei responsabile per la protezione della tua password e per tutte le attività che avvengono nel tuo account. Se noti attività sospette, sei tenuto a informare immediatamente il nostro team di supporto.</p>

                    <h6>4. <strong>Privacy</strong></h6>
                    <p>Rispettando la tua privacy, raccogliamo solo le informazioni necessarie per offrirti i nostri servizi. Per dettagli su come raccogliamo, usiamo e proteggiamo i tuoi dati, consulta la nostra <a
                            href="#"
                            onClick={handleShowPrivacy}
                            style={{ color: "#f1d600" }}
                        >
                            Politica sulla Privacy
                        </a>.
                    </p>

                    <h6>5. <strong>Proprietà Intellettuale</strong></h6>
                    <p>Il Sito e tutto il suo contenuto (inclusi testi, immagini, video, loghi, ecc.) sono protetti da diritti di proprietà intellettuale. Non è consentito copiare, modificare o distribuire qualsiasi parte del Sito senza il nostro esplicito permesso.</p>

                    <h6>6. <strong>Responsabilità dell'Utente</strong></h6>
                    <p>Ogni utente è responsabile per l'uso del Sito in modo che non violi leggi o diritti di terzi. È vietato caricare o condividere contenuti dannosi, offensivi o che violino i diritti di altre persone.</p>

                    <h6>7. <strong>Limitazione di Responsabilità</strong></h6>
                    <p>Non siamo responsabili per danni diretti, indiretti, speciali, accidentali o consequenziali derivanti dall'utilizzo o dall'incapacità di utilizzare il Sito, inclusi danni derivanti da errori, omissioni o interruzioni del servizio.</p>

                    <h6>8. <strong>Modifiche ai Termini</strong></h6>
                    <p>Ci riserviamo il diritto di modificare questi Termini e Condizioni in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina, e saranno effettive dal momento della pubblicazione. Ti invitiamo a controllare regolarmente questa pagina per rimanere aggiornato.</p>

                    <h6>9. <strong>Legge Applicabile</strong></h6>
                    <p>Questi Termini e Condizioni sono regolati dalla legge italiana. In caso di controversie, il foro competente sarà quello di Palermo, Italia.</p>

                    <h6>10. <strong>Contatti</strong></h6>
                    <p>Per qualsiasi domanda riguardo questi Termini e Condizioni, puoi contattarci all'indirizzo email: <a href="giampiero12345678@hotmail.it">giampiero12345678@hotmail.it</a>.</p>

                    <p>Se accetti questi Termini e Condizioni, clicca sulla checkbox di accettazione per continuare la registrazione.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showModalP}
                onHide={handleClosePrivacy}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Informativa sulla Privacy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>1. Titolare del Trattamento</h3>
                    <p>
                        <strong>Nome:</strong> Giampiero Barbaro<br />
                        <strong>Email:</strong> giampiero12345678@hotmail.it<br />
                    </p>

                    <h3>2. Tipi di Dati Raccolti</h3>
                    <ul>
                        <li>Dati di navigazione (indirizzo IP, tipo di browser, pagine visitate)</li>
                        <li>Dati forniti volontariamente (es. contatto via email o form)</li>
                        <li>Cookie tecnici e, previo consenso, cookie analitici</li>
                    </ul>

                    <h3>3. Finalità del Trattamento</h3>
                    <ul>
                        <li>Consentire il funzionamento tecnico del sito</li>
                        <li>Rispondere a richieste da parte degli utenti</li>
                        <li>Analisi statistica del traffico (solo previo consenso)</li>
                    </ul>

                    <h3>4. Cookie</h3>
                    <p>
                        Questo sito utilizza cookie tecnici essenziali. I cookie di terze
                        parti (es. Google Analytics) sono utilizzati solo se l’utente fornisce
                        il consenso.
                    </p>

                    <h3>5. Modalità del Trattamento</h3>
                    <p>
                        I dati sono trattati con strumenti elettronici nel rispetto delle misure
                        di sicurezza previste dalla normativa.
                    </p>

                    <h3>6. Conservazione dei Dati</h3>
                    <p>
                        I dati saranno conservati per il tempo necessario a soddisfare le
                        finalità indicate, o fino a eventuale richiesta di cancellazione.
                    </p>

                    <h3>7. Diritti dell’Interessato</h3>
                    <ul>
                        <li>Diritto di accesso ai dati</li>
                        <li>Diritto di rettifica o cancellazione</li>
                        <li>Diritto di limitazione o opposizione al trattamento</li>
                        <li>Diritto alla portabilità dei dati</li>
                        <li>Diritto di revoca del consenso</li>
                    </ul>

                    <h3>8. Modifiche all’Informativa</h3>
                    <p>
                        L’informativa può essere aggiornata in qualsiasi momento. Si consiglia
                        di consultarla periodicamente.
                    </p>

                    <p>Ultimo aggiornamento: 9 maggio 2025</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClosePrivacy}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>

            <br />
            <br />
        </Container>
    );
}

export default Registration;
