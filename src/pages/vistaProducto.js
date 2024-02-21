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

    useEffect(() => {
        obtenerProductos();
    }, []);

    return (
        <div className='container bg-white'>
            <div className='row selec mb-5'>
                <div className='col-lg-6'>
                    <div className="container app-container">
                        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {productos.map((producto, index) => (
                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                        <img
                                            src={`data:image/png;base64, ${producto.ImagenBase64}`}
                                            className="d-block w-100 h-auto"
                                            alt={producto.Nombre}
                                            style={{ objectFit: 'cover', maxHeight: '400px' }}
                                        />
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
                            <h1 className='m-4'>{productos[0].Nombre}</h1>
                            <h1 className='fs-1 mx-4'>{productos[0].Precio}</h1>

                            <div className='row mb-2'>
                                <div className='col-6'>
                                    <span className='fs-3 mx-4'><b>Marca:</b> {productos[0].Marca}</span>
                                </div>
                                <div className='col-6'>
                                    <span className='fs-3'><b>Modelo:</b> {productos[0].Modelo}</span>
                                </div>
                            </div>
                            <div className='row mb-2'>
                                <div className='col-6'>
                                    <span className='fs-3 mx-4'><b>Voltaje:</b> {productos[0].Voltaje}</span>
                                </div>
                                <div className='col-6'>
                                    <span className='fs-3'><b>Potencia:</b> {productos[0].Potencia}</span>
                                </div>
                            </div>
                            <div className='row mb-2'>
                                <div className='col-6'>
                                    <span className='fs-3 mx-4'><b>Lúmenes:</b> {productos[0].Lumenes}</span>
                                </div>
                                <div className='col-6'>
                                    <span className='fs-3'><b>Vida Util:</b><span>{productos[0].VidaUtil}</span></span>
                                </div>
                            </div>
                            <div className='row mb-2'>
                                <div className='col-6'>
                                    <span className='fs-3 mx-4'><b>Atenuable:</b> {productos[0].Atenuable}</span>

                                </div>
                                <div className='col-6'>
                                    <span className='fs-3'><b>Dimensiones:</b> {productos[0].Dimensiones}</span>
                                </div>
                            </div>
                            <div className='row mb-2'>
                                <div className='col-6'>
                                    <span className='fs-3 mx-4'><b>Ángulo:</b> {productos[0].Angulo}</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {productos.length > 0 && (
                <span className='fs-2 mx-4'><b>Descripcion:</b><br></br> <span className='mx-4'>{productos[0].Descripcion}</span></span>
            )}
        </div>
    );
}

export default ProductList;
