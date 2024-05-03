import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductList() {
    const [productos, setProductos] = useState([]);
    const { id } = useParams();

    const obtenerProductos = async () => {
        try {
            const response = await Axios.get(`https://ecommerce-k96h.onrender.com/ProductRoute/getProducts/${id}`);
            console.log(response.data);
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const agregarProductoCarrito = (product) => {
        let listaProductos = JSON.parse(localStorage.getItem('productos')) || []; // Obtener la lista de productos almacenados
        const existingProductIndex = listaProductos.findIndex(p => p.ID === product.ID);

        if (existingProductIndex !== -1) {
            // Si el producto ya está en el carrito, actualiza su cantidad
            if (listaProductos[existingProductIndex].Cantidad < 20) {
                listaProductos[existingProductIndex].Cantidad++;
                console.log("tamaño de lista: " + listaProductos[existingProductIndex].Cantidad);
            } else {
                console.log(`Ya no se puede agregar`);
            }
        } else {
            // Si el producto no está en el carrito, agrégalo con cantidad 1
            product.Cantidad = 1;
            listaProductos.push(product);
        }

        localStorage.setItem('productos', JSON.stringify(listaProductos)); // Guardar la lista actualizada en localStorage
        console.log(`Producto agregado al Local Storage: ${product.Nombre}`);
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    return (
        <div className='container bg-white' style={{ height: '83vh', overflow: 'auto' }}>
            <div className='row selec mb-5'>
                <div className='col-lg-6'>
                    <div className="container app-container mt-3">
                        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {productos.map((producto, index) => (
                                    <div className={`carousel-item mb-3 ${index === 0 ? 'active' : ''}`} key={index} style={{ height: '360px' }}>
                                        <div className="img-wrap rounded bg-light" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            <a>
                                                <img
                                                    src={`data:image/png;base64, ${producto.ImagenBase64}`}
                                                    className="d-block mix-blend-mode"
                                                    alt={producto.Nombre}
                                                    style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}
                                                />
                                            </a>
                                        </div>
                                    </div>
                                ))}

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
                    {productos.length > 0 && (
                        <>
                            <h1 className='m-4 text-gray-700 text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5xl'>{productos[0].Nombre}</h1>
                            <h1 className='text-4xl sm:text-4xl md:text-4xl lg:text-4xl xl:text-4xl mx-4'>$ {productos[0].Precio}</h1>

                            <div className="m-4 flex items-center border-2 border-gray-700 rounded-lg p-2 max-w-xs">
                                <img src={require('../assets/images/WhatsApp.png')} alt="Icono WhatsApp" className="w-20 h-20 mr-3" />
                                <div>
                                    <p className="text-xl font-bold">Cotización por WhatsApp</p>
                                    <p className="text-lg text-green-500 font-bold">Disponible</p>
                                </div>
                            </div>
                            <button className="btn btn-lg btn-outline-dark w-100 mt-2" onClick={() => agregarProductoCarrito(productos[0])}><b>Agregar a carrito</b></button>


                            <div className='row mb-2 fs-4 mt-5'>
                                <div className='col-6'>
                                    <table className='table table-striped'>
                                        <tbody className="texto-izquierda">
                                            <tr>
                                                <td className="p-3"><b>Marca:</b></td>
                                                <td className="p-3">{productos[0].Marca}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3"><b>Voltaje:</b></td>
                                                <td className="p-3">{productos[0].Voltaje}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3"><b>Lúmenes:</b></td>
                                                <td className="p-3">{productos[0].Lumenes}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3"><b>Atenuable:</b></td>
                                                <td className="p-3">{productos[0].Atenuable}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3"><b>Ángulo:</b></td>
                                                <td className="p-3">{productos[0].Angulo}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='col-6'>
                                    <table className='table table-striped'>
                                        <tbody className="texto-izquierda">
                                            <tr>
                                                <td className="p-3"><b>Modelo:</b></td>
                                                <td className="p-3">{productos[0].Modelo}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3"><b>Potencia:</b></td>
                                                <td className="p-3">{productos[0].Potencia}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3"><b>Vida Util:</b></td>
                                                <td className="p-3">{productos[0].VidaUtil}</td>
                                            </tr>
                                            <tr>
                                                <td className="p-3"><b>Dimensiones:</b></td>
                                                <td className="p-3">{productos[0].Dimensiones}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}
                </div>

            </div>
            {productos.length > 0 && (
                <div className='d-flex mb-2'>
                    <span className='fs-2 mx-4'><b>Descripcion:</b><br></br><span className='fs-2'>{productos[0].Descripcion}{productos[0].Descripcion}{productos[0].Descripcion}{productos[0].Descripcion}{productos[0].Descripcion}{productos[0].Descripcion}{productos[0].Descripcion}{productos[0].Descripcion}{productos[0].Descripcion}</span></span>
                </div>
            )}
        </div>
    );
}

export default ProductList;
