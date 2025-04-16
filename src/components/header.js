import NavBar from './navbar';
import React from 'react'
import {Carousel} from "react-bootstrap";
import './header.css';

function Header() {
    return (
        <div>
            <NavBar />
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="ImmagineCanvas1.png"
                    alt="Prima immagine"
                    />
                    <Carousel.Caption className='bl'>
                    <h3>Back-end</h3>
                    <p>Spring Boot - Express</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="ImmagineCanvas2.png"
                    alt="Seconda immagine"
                    />
                    <Carousel.Caption className='bc'>
                    <h3>Terminal</h3>
                    <p>Windows - Linux - Android</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="ImmagineCanvas3.png"
                    alt="Terza immagine"
                    />
                    <Carousel.Caption className='bl'>
                    <h3>Front-end</h3>
                    <p>React - React Native</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="gpu.jpg"
                    alt="Terza immagine"
                    />
                    <Carousel.Caption className='bc'>
                    <h3>Hardware</h3>
                    <p>Desktop - Mobile - Embedded</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );

}

export default Header;