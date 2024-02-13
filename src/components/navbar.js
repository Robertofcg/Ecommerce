import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import BotonWsp from '../components/botonWsp';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [productos, setProductos] = useState([]);

    const numero = "9513978560"; // Número de teléfono fijo

    const enviarMensaje = () => {
        const productos = JSON.parse(localStorage.getItem('productos')) || [];
        const mensaje = `Hola, me gustaría realizar una cotización. Productos seleccionados: ${productos.map(producto => producto.Nombre).join(', ')}`;
        const enlace = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensaje)}`;
        window.open(enlace, '_blank').focus();
    };
    // Función para obtener los productos del carrito del localStorage y actualizar el estado productos
    const obtenerProductosCarrito = () => {
        const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
        setProductos(productosGuardados);
    };

    const eliminarProducto = (index) => {
        // Copiar el arreglo de productos actual
        const nuevosProductos = [...productos];
        // Eliminar el producto del arreglo copiado
        nuevosProductos.splice(index, 1);
        // Actualizar el estado con el nuevo arreglo de productos
        setProductos(nuevosProductos);
        // Actualizar el localStorage
        localStorage.setItem('productos', JSON.stringify(nuevosProductos));
    };

    const cambiarCantidad = (index, cantidad) => {
        const nuevosProductos = [...productos];
        nuevosProductos[index].Cantidad = cantidad;
        setProductos(nuevosProductos);
        localStorage.setItem('productos', JSON.stringify(nuevosProductos));
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
        // Cuando se muestra el popup, actualiza los productos del carrito
        if (!showPopup) {
            obtenerProductosCarrito();
        }
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
                <NavLink className="logo d-flex align-items-center justify-content-center ecommerce" to="/">
                    Ecommerce
                </NavLink>
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
                            <NavLink to="/" activeclassname="active">
                                Inicio
                            </NavLink>
                        </li>
                        <li className="miItem">
                            <NavLink to="/catalogo" activeclassname="active">
                                Productos
                            </NavLink>
                        </li>
                        <li className="miItem">
                            <NavLink to="/contacto" activeclassname="active">
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
            </div>
            <span className="hide-mobile"></span>
            <span className="spTwo hide-mobile"></span>
            {showPopup && (
                <div className="popup-container">
                    <div className="popup-overlay" onClick={togglePopup}></div>
                    <div className="popup">
                        <button onClick={togglePopup} className='btn btn-close d-flex justify-content-end'></button>
                        <div className="popup-inner">
                            <h1 className='Titulo-carrito'>Carrito</h1>
                            <p className='fs-3'>Productos seleccionados</p>
                            <table className="table ">
                                <thead>
                                    <tr className='fs-4'>
                                        <th>imagen</th>
                                        <th colSpan={2}>Nombre</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((producto, index) => (
                                        <tr key={index}>
                                            <td>
                                                <img className="mix-blend-mode" src={`data:image/png;base64, ${producto.ImagenBase64}`} width={200} height={100} />
                                            </td>
                                            <td className='fs-3'>{producto.Nombre}<br></br> <button className='btn btn-danger' onClick={() => eliminarProducto(index)}>Eliminar</button></td>
                                            <td className='fs-3' style={{ width: 'auto' }}>
                                                <select
                                                    value={producto.Cantidad}
                                                    onChange={(e) => {
                                                        const newValue = parseInt(e.target.value);
                                                        if (newValue === -1) {
                                                            const newAmount = parseInt(window.prompt('Ingrese la cantidad:'));
                                                            if (!isNaN(newAmount) && newAmount > 0) {
                                                                cambiarCantidad(index, newAmount);
                                                            }
                                                        } else {
                                                            cambiarCantidad(index, newValue);
                                                        }
                                                    }}
                                                >
                                                    {[...Array(6).keys()].map((cantidad) => (
                                                        <option key={cantidad} value={cantidad + 1}>{cantidad + 1 + " u."}</option>
                                                    ))}
                                                    <option value={-1}>Otro</option>
                                                </select>
                                            </td>                                   

                                            <td className='fs-3'>${(producto.Precio) * (producto.Cantidad)}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="footer fixed-bottom bg-light">
                            <div className="col-sm-12 col-md-12 col-lg-12 d-grid">
                                <button type="submit" id="btnRegistrar" className="btn-block text-white boton-carrito" onClick={enviarMensaje}>Mandar corizacion</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
