import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function ProductCard({ imgSrc, title, price, discountPrice }) {
    return (
        <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-lg-five mb-4">
            <figure className="card card-product-grid h-100">
                <div className="img-wrap rounded bg-light">
                    <span className="topbar">
                        <span className="badge tag-discount">-20%</span>
                    </span>
                    <img className="mix-blend-mode" src={imgSrc} alt={title} />
                </div>
                <figcaption className="card-product-info m-3">
                    <a href="/" className="title">{title}</a>
                    <div className="price-wrap">
                        <span className="price">${price}</span>
                        <del className="discount-price">${discountPrice}</del>
                    </div>
                </figcaption>
                <footer className="card-footer">
                    <button className="btn btn-lg btn-outline-dark w-100 mt-2 agregarCarrito">Agregar a carrito</button>
                </footer>

            </figure>
        </div>
    );
}

function ProductList() {
    const [productos, setProductos] = useState([]);

    const obtenerProductos = async () => {
        try {
            const token = localStorage.getItem('token'); // Obtener el token almacenado localmente
            const response = await Axios.get("https://ecommerce-k96h.onrender.com/ProductRoute/getProducts", {
                headers: {
                    Authorization: `Bearer ${token}` // Agregar el token al encabezado de autorización
                }
            });
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
        <div className="container mt-4 app-container">
            <div className="row">
                {productos.map((producto, index) => (
                    <ProductCard
                        key={index}
                        imgSrc="https://res.cloudinary.com/postedin/image/upload/v1/a97433f3-e53e-494e-9492-ec78cc570aad/webpnet-resizeimage-5"
                        title={producto.nombre}
                        price={producto.precio}
                        discountPrice="49.99"
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductList;
