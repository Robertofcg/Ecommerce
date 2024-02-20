import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

function ProductList() {
    const [producto, setProducto] = useState(null);
    const { id } = useParams();

    const obtenerProducto = async () => {
        try {
            const response = await Axios.get(`https://ecommerce-k96h.onrender.com/ProductRoute/getProducts/${id}`);
            console.log(response.data);
            setProducto(response.data);
        } catch (error) {
            console.error('Error al obtener producto:', error);
        }
    };

    useEffect(() => {
        obtenerProducto();
    }, [id]);

    if (!producto) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <div className='row'>
                <div className='col-lg-6'>
                    <Carousel>
                        {producto.map((producto, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={`data:image/png;base64,${producto.ImagenBase64}`}
                                    alt={`Product ${id} Image ${index + 1}`}
                                    style={{ height: '400px', objectFit: 'cover' }} // Establecer el mismo tamaño para todas las imágenes
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>

                <div className='col-lg-6'>
                    ss
                </div>

            </div>

        </div>
    );
}

export default ProductList;
