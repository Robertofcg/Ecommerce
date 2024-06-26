// import React, { useState, useEffect } from 'react';
// import Axios from 'axios';
// import { useNavigate } from 'react-router-dom';
const Card = ({ title, copy, button }) => (
    <div className="card cardCategoria">
        <div className="text-white content">
            <h2 className="title">{title}</h2>
            <p className="copy">{copy}</p>
            <button className="btn bg-primary text-white">{button}</button>
        </div>
    </div>
);

const cards = [
    { title: 'Mountain View', copy: 'Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains', button: 'View Trips' },
    { title: 'To The Beach', copy: 'Plan your next beach trip with these fabulous destinations', button: 'View Trips' },
    { title: 'Desert Destinations', copy: 'It\'s the desert you\'ve always dreamed of', button: 'Book Now' },
    { title: 'Explore The Galaxy', copy: 'Seriously, straight up, just blast off into outer space today', button: 'Book Now' }
];


const inicio = () => {
    const IrCarrucel = () => {
        const carouselSection = document.getElementById('carouselExampleIndicators');
        carouselSection.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div className={`contenedorG oscuro mt-24 pt-24`}>
            {/* BIENVENIDA */}
            <img
                src={require('../assets/images/led.png')} // Usa require para importar la imagen
                alt="Imagen de fondo"
                className="imagen"
            />
            <div className="textoSuperpuesto">
                <h1 className="titulo">Bienvenido a Mi Landing Page</h1>
                <p className="parrafo">
                    Descubre lo que tenemos para ofrecerte. ¡Explora y disfruta de la
                    experiencia!
                </p>
                <button className="boton" onClick={IrCarrucel}>
                    Ver más
                </button>

            </div>

            {/* CARRUCEL DE IMAGENES */}

            <div id="carouselExampleIndicators" className="carousel slide demo mb-0" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                </div>

                <div className="carousel-inner rounded">
                    <div className="carousel-item">
                        <div className="image-container">
                            <img src="https://krcrtv.com/resources/media/e6198348-bf1d-4a97-91d8-c4b33fa817eb-large16x9_1280x960_80806B00ILGKJ.jpg?1542740203755" className='chicago' alt="Chicago" />
                            <div className="carousel-caption">
                                <h3>Chicago</h3>
                                <p>Thank you, Chicago!</p>
                            </div>
                        </div>
                    </div>

                    <div className="carousel-item active">
                        <div className="image-container">
                            <img src="https://cdn.wallpapersafari.com/78/18/l1RySF.jpg" className='NewYork' alt="New York" />
                            <div className="carousel-caption">
                                <h3>New York</h3>
                                <p>We love the Big Apple!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="carousel-control-prev carrucel-siguiente" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <button type="button" className="arrows left-arrow arrow-inactive" aria-label="Arrow Left">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                            <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
                        </svg>
                    </button>
                    <span className="visually-hidden">Previous</span>
                </p>

                <p className="carousel-control-next carrucel-siguiente" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <button type="button" className="arrows right-arrow" aria-label="Arrow Right">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512">
                            <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
                        </svg>
                    </button>
                    <span className="visually-hidden">Next</span>
                </p>
            </div>

            {/* CATEGORIAS */}
            <div className='container mt-5 mb-5'>
                <h1 className='titulo-categoria text-center'>Explora el Mundo de la Iluminación</h1>
                <p className='descripcion-categoria text-center'>Descubre la perfección en cada rincón con nuestras luces excepcionales.</p>

                <div className="page-content container">
                    {cards.map((card, index) => (
                        <Card key={index} title={card.title} copy={card.copy} button={card.button} />
                    ))}
                </div>
            </div>


            {/* MISION Y VISION */}
            <section id="mision-vision" className="container pb-5">
                <h1 className='titulo-categoria text-center'>Quienes somos</h1>

                <div className="flex flex-col md:flex-row pt-5">
                    <div className="w-full md:w-1/2 md:order-1 border border-blue-500 border-solid">
                        <div className="p-4">
                            <h2 className="text-5xl font-bold text-blue-600 text-center">Misión</h2>
                            <p className="mt-4 text-2xl">Nuestra misión es proporcionar iluminación de alta calidad que transforme espacios y mejore la vida cotidiana. Buscamos la innovación, la sostenibilidad y la satisfacción del cliente en cada producto que ofrecemos.</p>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 md:pl-4 md:order-2">
                        <img src="ruta_de_la_imagen.jpg" alt="Imagen de la Visión" className="mx-auto md:mx-0 mt-4 md:mt-0" style={{ maxWidth: '100%' }} /> {/* Agregado de imagen para la Visión */}
                    </div>
                </div>


                <div className="flex flex-col md:flex-row mt-8"> {/* Agregado de mt-8 para separar verticalmente las secciones */}
                    <div className="w-full md:w-1/2 md:pr-4">
                        <img src="ruta_de_la_imagen.jpg" alt="Imagen de la Misión" className="mx-auto md:mx-0 mb-4 md:mt-0" style={{ maxWidth: '100%' }} /> {/* Agregado de imagen para la Misión */}
                    </div>

                    <div className="w-full md:w-1/2 md:order-2 border border-blue-500 border-solid">
                        <div className="p-4">
                            <h2 className="text-5xl font-bold text-center text-blue-600">Visión</h2>
                            <p className="mt-4 text-2xl">Guiados por la excelencia, aspiramos a ser líderes en el mercado de iluminación, creando tendencias y superando las expectativas. Nos esforzamos por ser reconocidos por nuestro compromiso con la calidad, el diseño y la responsabilidad social.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}

export default inicio;
