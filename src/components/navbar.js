import React, { useState, useRef } from 'react';
import { Navbar, Container, Image, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../pages/context/AuthContext';

function NavBar() {
    const { user } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({});
    const iconRef = useRef(null);
    const isApp = navigator.userAgent.includes('AppBarbaroPage');

    const handleMenuItemClick = () => {
        setDropdownOpen(false); // Chiude il menu
    };
    
    const setDropdownMenuPosition = () => {
        if (iconRef.current) {
            const rect = iconRef.current.getBoundingClientRect();
            setMenuPosition({
                top: rect.bottom,
                left: rect.right - rect.width
            });
        }
    };

    const onDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
        if (!dropdownOpen) {
            setDropdownMenuPosition(); // Imposta la posizione solo quando il menu si apre
        }
    };

    return (
        <>
        <Navbar className="navbar-overlay">
            <Container>
                <Navbar.Brand data-text="Giampiero Barbaro" className="title" as={Link} to="/">Giampiero Barbaro</Navbar.Brand>
                {!isApp && 
                    <>
                        {user ? (
                            <div className="d-flex align-items-center">
                                {user.image ? (
                                    <div ref={iconRef} onClick={onDropdownToggle}>
                                        <Image 
                                            src={user.image} 
                                            roundedCircle 
                                            style={{ width: '40px', height: '40px', objectFit: 'cover', cursor: 'pointer' }} 
                                        />
                                    </div>
                                ) : (
                                    <div 
                                        ref={iconRef}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            border: '2px solid #ccc',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#f8f9fa',
                                            cursor: 'pointer'
                                        }} 
                                        onClick={onDropdownToggle}
                                    >
                                    <span style={{ fontSize: 'small', color: '#ccc' }}>+</span>
                                    </div>
                                )}
                                {dropdownOpen && (
                                    <div 
                                        style={{
                                            position: 'absolute',
                                            top: menuPosition.top + 5,
                                            left: menuPosition.left + 40,
                                            zIndex: 1000,
                                            backgroundColor: '#fff',
                                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                            borderRadius: '5px',
                                            width: 'auto',
                                        }}
                                    >
                                    <Dropdown.Menu className='tr' show align="end">
                                        <Dropdown.Item as={Link} to="/profile" onClick={handleMenuItemClick}>Profilo</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/logout" onClick={handleMenuItemClick}>Disconnettiti</Dropdown.Item>
                                    </Dropdown.Menu>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="d-flex align-items-center">
                                <div 
                                    ref={iconRef}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        border: '2px solid #ccc',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#f8f9fa',
                                        cursor: 'pointer'
                                    }} 
                                    onClick={onDropdownToggle}
                                >
                                <span style={{ fontSize: 'small', color: '#ccc' }}>+</span>
                                </div>
                                {dropdownOpen && (
                                    <div 
                                        style={{
                                            position: 'absolute',
                                            top: menuPosition.top + 5,
                                            left: menuPosition.left + 40,
                                            zIndex: 1000,
                                            backgroundColor: '#fff',
                                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                            borderRadius: '5px',
                                            width: 'auto',
                                        }}
                                    >
                                    <Dropdown.Menu className='tr' show align="end">
                                        <Dropdown.Item as={Link} to="/login" onClick={handleMenuItemClick}>Accedi</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/registration" onClick={handleMenuItemClick}>Registrati</Dropdown.Item>
                                    </Dropdown.Menu>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                }
            </Container>
        </Navbar>
        </>
    );
}

export default NavBar;