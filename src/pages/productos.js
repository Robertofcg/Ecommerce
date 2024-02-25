import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import Axios from 'axios';

function ProductCard({ imgSrc, title, price, discountPrice, agregarProductoCarrito, product }) {
    return (
        <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-lg-five mb-4">
            <figure className="card card-product-grid">
                <div className="img-wrap rounded bg-light">
                    <span className="topbar">
                        {/* <span className="badge tag-discount">-20%</span> */}
                    </span>
                    <NavLink to={`/vistaProductos/${product.ID}`} activeclassname="active">
                        <img className="mix-blend-mode" src={imgSrc} alt={title} />
                    </NavLink>
                </div>
                <figcaption className="card-product-info m-3">
                    <NavLink to={`/vistaProductos/${product.ID}`} activeclassname="active" className='title'>
                        {title}
                    </NavLink>

                    <div className="price-wrap">
                        <span className="price">${price}</span>
                        {/* <del className="discount-price">${discountPrice}</del> */}
                    </div>
                </figcaption>
                <footer className="card-footer">
                    <button className="btn btn-lg btn-outline-dark w-100 mt-2 agregarCarrito" onClick={() => agregarProductoCarrito(product)}>Agregar a carrito</button>
                </footer>
            </figure>
        </div>
        
    );
}

function ProductList() {
    const [productos, setProductos] = useState([]);
    const [buscar, setBuscar] = useState("");

    const obtenerProductos = async () => {
        try {
            const response = await Axios.get("https://ecommerce-k96h.onrender.com/ProductRoute/getProducts");
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
            listaProductos[existingProductIndex].Cantidad++;
        } else {
            // Si el producto no está en el carrito, agrégalo con cantidad 1
            product.Cantidad = 1;
            listaProductos.push(product);
        }

        localStorage.setItem('productos', JSON.stringify(listaProductos)); // Guardar la lista actualizada en localStorage
        console.log(`Producto agregado al Local Storage: ${product.Nombre}`);
    };

    const eliminarAcentos = (cadena) => {
        return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const buscador = (e) => {
        setBuscar(eliminarAcentos(e.target.value.toLowerCase()));
        console.log(e.target.value);
    };

    let resultados = [];
    if (!buscar) {
        resultados = productos;
    } else {
        resultados = productos.filter((dato) =>
            eliminarAcentos(dato.Nombre.toLowerCase()).includes(buscar)
        );
    }



    useEffect(() => {
        obtenerProductos();
    }, []);

    return (
        <div className="container mt-4 app-container">
            <input value={buscar} onChange={buscador} type='text' placeholder='Buscar' className='form-control mb-3 fs-3'></input>
            <div className="row">
                {resultados.map((producto, index) => (
                    <ProductCard
                        key={index}
                        title={producto.Nombre}
                        price={producto.Precio}
                        discountPrice="49.99"
                        agregarProductoCarrito={agregarProductoCarrito}
                        product={producto}
                        imgSrc={`data:image/png;base64, ${producto.ImagenBase64}`} // Utilizar la URL base64 proporcionada en los datos del producto
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductList;
