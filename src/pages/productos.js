import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import Axios from 'axios';

function ProductList() {
    const [productos, setProductos] = useState([]);
    const [buscar, setBuscar] = useState("");
    const [categoria, setCategoria] = useState({
        led1: false,
        led2: false
    });

    const [datosFiltrados, setDatosFiltrados] = useState([]);

    const filtrarProductos = () => {
        let productosFiltrados = [...productos];

        // Filtrar por categoría
        if (categoria.led1 || categoria.led2) {
            productosFiltrados = productosFiltrados.filter(item => {
                if (categoria.led1 && item.Categoria === "led1") return true;
                if (categoria.led2 && item.Categoria === "led2") return true;
                return false;
            });
        }

        // Filtrar por búsqueda
        if (buscar) {
            productosFiltrados = productosFiltrados.filter(item =>
                eliminarAcentos(item.Nombre.toLowerCase()).includes(buscar)
            );
        }

        setDatosFiltrados(productosFiltrados);
    };

    const obtenerProductos = async () => {
        try {
            const response = await Axios.get("https://ecommerce-k96h.onrender.com/ProductRoute/getProducts");
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

    const eliminarAcentos = (cadena) => {
        return cadena.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const handleOnCheckbox = (e) => {
        setCategoria({
            ...categoria,
            [e.target.value]: e.target.checked,
        });
    };

    const buscador = (e) => {
        setBuscar(eliminarAcentos(e.target.value.toLowerCase()));
    };



    useEffect(() => {
        obtenerProductos();
        filtrarProductos();

    }, [productos, categoria, buscar]);

    return (
        <div className="container mt-4 app-container">
            <input value={buscar} onChange={buscador} type='text' placeholder='Buscar' className='form-control mb-3 fs-3'></input>

            <div className="row">
                <div className="col-md-2 p-5">
                    <h2>Categorias</h2>
                    <input onChange={handleOnCheckbox} type='checkbox' name='filtro' value={'led1'} id='led1'></input><label className='fs-4'> led1</label><br></br>
                    <input onChange={handleOnCheckbox} type='checkbox' name='filtro' value={'led2'} id='led2'></input><label className='fs-4'> led2</label>
                </div>
                <div className="col-md-10">
                    <div className="row">
                        {datosFiltrados.map((producto, index) => (
                            <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-lg-five mb-4" key={index}>
                                <figure className="card card-product-grid">
                                    <div className="img-wrap rounded bg-light">
                                        <span className="topbar"></span>
                                        <NavLink to={`/vistaProductos/${producto.ID}`} activeclassname="active">
                                            <img className="mix-blend-mode" src={`data:image/png;base64, ${producto.ImagenBase64}`} alt={producto.Nombre} />
                                        </NavLink>
                                    </div>
                                    <figcaption className="card-product-info m-3">
                                        <NavLink to={`/vistaProductos/${producto.ID}`} activeclassname="active" className='title'>
                                            {producto.Nombre}
                                        </NavLink>
                                        <div className="price-wrap">
                                            <span className="price">${producto.Precio}</span>
                                            {/* <del className="discount-price">$49.99</del> */}
                                        </div>
                                    </figcaption>
                                    <footer className="card-footer">
                                        <button className="btn btn-lg btn-outline-dark w-100 mt-2 agregarCarrito" onClick={() => agregarProductoCarrito(producto)}>Agregar a carrito</button>
                                    </footer>
                                </figure>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ProductList;
