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
                    <div className="container app-container mt-3">
                        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {productos.map((producto, index) => (
                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index} style={{ height: '400px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            <img
                                                src={`data:image/png;base64, ${producto.ImagenBase64}`}
                                                className="d-block"
                                                alt={producto.Nombre}
                                                style={{ objectFit: 'contain', maxHeight: '100%', maxWidth: '100%' }}
                                            />
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
                <div className='col-lg-6' >
                    {productos.length > 0 && (
                        <>
                            <h1 className='m-4' style={{ color: '#6a6f74' }}>{productos[0].Nombre}</h1>
                            <h1 className='fs-1 mx-4'>$ {productos[0].Precio}</h1>

                            <div className='row mb-2 fs-4 mt-5'>
                                <div className='col-6'>
                                    <table className='table table-striped'>
                                        <tbody>
                                            <tr>
                                                <td><b>Marca:</b></td>
                                                <td>{productos[0].Marca}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Voltaje:</b></td>
                                                <td>{productos[0].Voltaje}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Lúmenes:</b></td>
                                                <td>{productos[0].Lumenes}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Atenuable:</b></td>
                                                <td>{productos[0].Atenuable}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Ángulo:</b></td>
                                                <td>{productos[0].Angulo}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='col-6'>
                                    <table className='table table-striped'>
                                        <tbody>
                                            <tr>
                                                <td><b>Modelo:</b></td>
                                                <td>{productos[0].Modelo}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Potencia:</b></td>
                                                <td>{productos[0].Potencia}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Vida Util:</b></td>
                                                <td>{productos[0].VidaUtil}</td>
                                            </tr>
                                            <tr>
                                                <td><b>Dimensiones:</b></td>
                                                <td>{productos[0].Dimensiones}</td>
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
                <div className='row mb-2'>
                    <span className='fs-2 mx-4'><b>Descripcion:</b><br></br><span className='fs-4'>{productos[0].Descripcion}</span></span>
                </div>
            )}
        </div>
    );
}

export default ProductList;
