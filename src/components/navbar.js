import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    useEffect(() => {
        // Agregar un manejador de eventos de clic al componente entero para cerrar el menú si se hace clic fuera de él
        const handleClickOutside = (event) => {
            if (isMenuOpen && !event.target.closest('.navbar')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <header>
            <div className="wrapper navbar">
                <a className="logo d-flex align-items-center justify-content-center ecommerce">
                    <NavLink to="/Ecommerce">Ecommerce</NavLink>
                </a>

                <nav className={isMenuOpen ? 'toggle-menu' : ''}>
                    <svg
                        className="close"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={toggleMenu}
                    >
                        <path
                            d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z"
                            fill="white"
                        />
                    </svg>
                    <ul className="miLista">
                        <li className="miItem">
                            <NavLink exact to="/Ecommerce" activeClassName="active">
                                Inicio
                            </NavLink>
                        </li>
                        <li className="miItem">
                            <NavLink to="/catalogo" activeClassName="active">
                                Productos
                            </NavLink>
                        </li>
                        <li className="miItem">
                            <NavLink to="/contacto" activeClassName="active">
                                Contacto
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}

                <div className="btn d-flex align-items-center">
                    <button type="submit" className="botonNav carrito-b d-flex align-items-center" onClick={togglePopup}>
                        <div className="carrito-icono">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                        </div>
                        <p className="mb-0 ml-2 carritoText">Carrito</p>

                    </button>
                    <svg
                        className="hamburger"
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={toggleMenu}
                    >
                        <path
                            d="M15 22.5H3.75V20H15V22.5ZM26.25 16.25H3.75V13.75H26.25V16.25ZM26.25 10H15V7.5H26.25V10Z"
                            fill="white"
                        />
                    </svg>



                </div>
                <a href="https://api.whatsapp.com/send?phone=9513978560" className="btn-wsp" target="_blank">
                    <i className="bi bi-whatsapp"></i>
                </a>
            </div>
            <span className="hide-mobile"></span>
            <span className="spTwo hide-mobile"></span>
            {showPopup && (
                <div className="popup-container">
                    <div className="popup-overlay" onClick={togglePopup}></div>
                    <div className="popup">
                        <button onClick={togglePopup} className='btn btn-close d-flex justify-items-end'></button>
                        <div className="popup-inner">
                            <h2>Carrito</h2>
                            <p>Productos seleccionados</p>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
