import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';

function VistaProductos() {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await Axios.get(`https://ecommerce-k96h.onrender.com/ProductRoute/getProducts/${id}`);
                setProducto(response.data);
            } catch (error) {
                console.error('Error al obtener producto:', error);
            }
        };

        obtenerProductos();
    }, [id]); // Asegúrate de incluir id en la lista de dependencias

    if (!producto) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <div class="row">
                <div class="col-md-6">
                    <div id="carouselExampleIndicators" class="carousel slide custom-carousel mt-1 contenedorG oscuro" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        </div>

                        <div class="carousel-inner rounded">
                            <div class="carousel-item">
                                <div class="image-container">
                                    <img src="https://krcrtv.com/resources/media/e6198348-bf1d-4a97-91d8-c4b33fa817eb-large16x9_1280x960_80806B00ILGKJ.jpg?1542740203755" class="custom-chicago" alt="Chicago" />
                                    <div class="carousel-caption">
                                        <h3>Chicago</h3>
                                        <p>Thank you, Chicago!</p>
                                    </div>
                                </div>
                            </div>

                            <div class="carousel-item active">
                                <div class="image-container">
                                    <img src={`data:image/png;base64, ${producto.imagenes_adicionales}`} class="custom-NewYork" alt="New York" />
                                    <div class="carousel-caption">
                                        <h3>New York</h3>
                                        <p>We love the Big Apple!</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p class="carousel-control-prev carrucel-siguiente" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <button type="button" class="custom-arrows left-arrow arrow-inactive" aria-label="Arrow Left">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                                    <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
                                </svg>
                            </button>
                            <span class="visually-hidden">Previous</span>
                        </p>

                        <p class="carousel-control-next carrucel-siguiente" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <button type="button" class="custom-arrows right-arrow" aria-label="Arrow Right">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                                    <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
                                </svg>
                            </button>
                            <span class="visually-hidden">Next</span>
                        </p>
                    </div>
                </div>

                <div class="col-md-6">
                    <h1 class='m-4'>{producto.Nombre}</h1>
                </div>
            </div>

        </div>
    );
}

export default VistaProductos;
