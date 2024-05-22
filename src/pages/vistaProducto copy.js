import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductList() {
    const [producto, setProducto] = useState(null);
    const { id } = useParams();

    const obtenerProducto = async () => {
        try {
            const response = await Axios.get(`https://ecommerce-productos.up.railway.app/api/productos/${id}`);
            //const response = await Axios.get(`http://localhost:8080/api/productos/${id}`);
            setProducto(response.data);
        } catch (error) {
            console.error('Error al obtener producto:', error);
        }
    };

    const agregarProductoCarrito = (product) => {
        let listaProductos = JSON.parse(localStorage.getItem('productos')) || [];

        const existingProductIndex = listaProductos.findIndex(p => p.id === product.id);

        if (existingProductIndex !== -1) {
            if (listaProductos[existingProductIndex].cantidad < 20) {
                listaProductos[existingProductIndex].cantidad++;
            } else {
                console.log('Ya no se puede agregar');
            }
        } else {
            product.cantidad = 1;
            listaProductos.push(product);
        }

        localStorage.setItem('productos', JSON.stringify(listaProductos));
        console.log(`Producto agregado al Local Storage: ${product.nombre}`);
    };

    useEffect(() => {
        obtenerProducto();
    }, []);

    return (
        <div className='container bg-white mt-24 pt-24' style={{ height: '88vh', overflow: 'auto' }}>
            {producto && (
                <div className='row mb-5'>
                    <div className='col-lg-6'>
                        <div className="container app-container mt-3">
                            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                                <div className="carousel-inner">
                                    {producto.imagenesProd && producto.imagenesProd.length > 0 ? (
                                        producto.imagenesProd.map((imagen, imgIndex) => (
                                            <div className={`carousel-item mb-3 ${imgIndex === 0 ? 'active' : ''}`} key={imgIndex} style={{ height: '475px' }}>
                                                <div className="img-wrap rounded bg-light" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                                    <img
                                                        src={`data:image/png;base64, ${imagen.imagenes}`}
                                                        className="d-block mix-blend-mode"
                                                        alt={producto.nombre}
                                                        style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="carousel-item mb-3 active" style={{ height: '475px' }}>
                                            <div className='d-flex justify-content-center align-items-center font-semibold text-3xl' style={{ height: '100%' }}>
                                                <p>Imagen no disponible</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <h1 className='m-4 text-gray-700 text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl'>{producto.nombre}</h1>
                        <h1 className='text-4xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl mx-4'>$ {producto.precio}</h1>

                        <div className="m-4 flex items-center border-2 border-gray-700 rounded-lg p-2 max-w-xs">
                            <img src={require('../assets/images/WhatsApp.png')} alt="Icono WhatsApp" className="w-20 h-20 mr-3" />
                            <div>
                                <p className="text-xl font-bold">Cotización por WhatsApp</p>
                                <p className="text-lg text-green-500 font-bold">Disponible</p>
                            </div>
                        </div>
                        <button className="btn btn-lg btn-outline-dark w-100 mt-2" onClick={() => agregarProductoCarrito(producto)}><b>Agregar a carrito</b></button>

                        <div className='row mb-2 fs-4 mt-5'>
                            <div className='col-6'>
                                <table className='table table-striped'>
                                    <tbody className="texto-izquierda">
                                        <tr>
                                            <td className="p-3"><b>Marca:</b></td>
                                            <td className="p-3">{producto.marca}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3"><b>Voltaje:</b></td>
                                            <td className="p-3">{producto.voltaje}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3"><b>Lúmenes:</b></td>
                                            <td className="p-3">{producto.lumenes}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3"><b>Atenuable:</b></td>
                                            <td className="p-3">{producto.atenuable}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3"><b>Ángulo:</b></td>
                                            <td className="p-3">{producto.angulo}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='col-6'>
                                <table className='table table-striped'>
                                    <tbody className="texto-izquierda">
                                        <tr>
                                            <td className="p-3"><b>Modelo:</b></td>
                                            <td className="p-3">{producto.modelo}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3"><b>Potencia:</b></td>
                                            <td className="p-3">{producto.potencia}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3"><b>Vida Util:</b></td>
                                            <td className="p-3">{producto.vidaUtil}</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3"><b>Dimensiones:</b></td>
                                            <td className="p-3">{producto.dimensiones}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className='d-flex mb-2 border-gray-300 border-t-2 descripcion-container'>
                        <span className='fs-2 mx-4 mt-2'><b>Descripcion:</b><br></br><span className='fs-2'>{producto.descripcion}</span></span>
                    </div>
                </div>

            )}

        </div>
    );
}

export default ProductList;

