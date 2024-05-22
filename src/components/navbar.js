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
        const mensaje = `Hola, me gustaría realizar una cotización. Productos seleccionados:\n${productos.map(producto => `${producto.nombre} (${producto.cantidad} x $${producto.precio} = $${producto.cantidad * producto.precio})`).join('\n')}`;
        const enlace = `https://api.whatsapp.com/send?phone=${numero}&text=${encodeURIComponent(mensaje)}`;
        window.open(enlace, '_blank').focus();
    };


    const obtenerProductosCarrito = () => {
        const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
        setProductos(productosGuardados);
    };

    const eliminarProducto = (index) => {
        const nuevosProductos = [...productos];
        nuevosProductos.splice(index, 1);
        setProductos(nuevosProductos);
        localStorage.setItem('productos', JSON.stringify(nuevosProductos));
    };

    const cambiarCantidad = (index, cantidad) => {
        const nuevosProductos = [...productos];
        nuevosProductos[index].cantidad = cantidad;
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
        if (!showPopup) {
            obtenerProductosCarrito();
        }
    };

    const calcularTotal = (productos) => {
        let total = 0;
        productos.forEach(producto => {
            total += producto.precio * producto.cantidad;
        });
        return total;
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
        <header className="fixed top-0 left-0 w-full shadow-md z-50">
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
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto px-1 xl:px-20">
                    <div className="fixed inset-0 bg-gray-700 opacity-75"></div>
                    <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-7xl mx-auto overflow-hidden">
                        <div className="flex justify-end p-4 border-b border-gray-200">
                            <button onClick={togglePopup} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                <svg className="w-8 h-8 fill-current" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10.707 10l4.146-4.146a.5.5 0 1 0-.708-.708L10 9.293 5.854 5.146a.5.5 0 1 0-.708.708L9.293 10l-4.147 4.146a.5.5 0 0 0 .708.708L10 10.707l4.146 4.147a.5.5 0 0 0 .708-.708L10.707 10z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="px-10 py-8">
                            <h1 className="text-5xl font-bold mb-6 text-center text-gray-800">Carrito de compras</h1>
                            <p className="text-3xl mb-6 text-center text-gray-600">Productos seleccionados</p>
                            <div className="overflow-x-auto">
                                <div className="max-h-[38rem] lg:max-h-[38rem] xl:max-h-[38rem] overflow-y-auto">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="bg-gray-100 text-left text-gray-700 text-xl">
                                                <th className="px-4 py-3">Producto</th>
                                                <th className="px-4 py-3">Nombre</th>
                                                <th className="px-4 py-3">Cantidad</th>
                                                <th className="px-4 py-3">Precio</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productos.map((producto, index) => (
                                                <tr key={index} className="border-b border-gray-200">
                                                    <td className="px-4 py-4">
                                                        <img src={`data:image/png;base64, ${producto.ImagenBase64}`} alt={producto.nombre} className="w-32 h-20 object-cover rounded-lg shadow-md" />
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <p className="font-semibold text-xl xl:text-2xl text-gray-800">{producto.nombre}</p>
                                                        <button className="text-red-500 hover:text-red-700 text-xl mt-2 font-semibold" onClick={() => eliminarProducto(index)}>Eliminar</button>
                                                    </td>
                                                    <td className="px-4 py-4">
                                                        <select
                                                            value={producto.cantidad}
                                                            onChange={(e) => {
                                                                const newValue = parseInt(e.target.value);
                                                                if (newValue === -1) {
                                                                    const newAmount = parseInt(window.prompt('Ingrese la cantidad:'));
                                                                    if (!isNaN(newAmount) && newAmount > 0 && newAmount < 20) {
                                                                        cambiarCantidad(index, newAmount);
                                                                    } else {
                                                                        alert('No puede ingresar más de 20 productos');
                                                                    }
                                                                } else {
                                                                    cambiarCantidad(index, newValue);
                                                                }
                                                            }}
                                                            className="border border-gray-300 rounded-md p-2 text-lg"
                                                            style={{ fontSize: '1.5rem' }} // Aquí ajustamos el tamaño de la fuente
                                                        >
                                                            {[...Array(6).keys()].map((cantidad) => (
                                                                <option key={cantidad} value={cantidad + 1}>{cantidad + 1} u.</option>
                                                            ))}
                                                            {producto.cantidad > 6 && <option value={producto.cantidad}>{producto.cantidad} u.</option>}
                                                            <option value={-1}>Otro</option>
                                                        </select>
                                                    </td>


                                                    <td className="px-4 py-4 text-2xl text-gray-800">${((producto.precio) * (producto.cantidad)).toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between items-center text-3xl font-semibold text-gray-800">
                                    <span>Total:</span>
                                    <span>${calcularTotal(productos).toFixed(2)}</span>
                                </div>
                                <button type="submit" className="text-2xl w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg focus:outline-none focus:shadow-outline" onClick={enviarMensaje}>Mandar cotización</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}




        </header>
    );
};

export default Navbar;
