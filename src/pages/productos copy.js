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

        if (categoria.led1 || categoria.led2) {
            productosFiltrados = productosFiltrados.filter(item => {
                if (categoria.led1 && item.Categoria === "led1") return true;
                if (categoria.led2 && item.Categoria === "led2") return true;
                return false;
            });
        }

        if (buscar) {
            productosFiltrados = productosFiltrados.filter(item =>
                eliminarAcentos(item.Nombre.toLowerCase()).includes(buscar)
            );
        }

        setDatosFiltrados(productosFiltrados);
    };

    const obtenerProductos = async () => {
        try {
            const response = await Axios.get("https://ecommerce-productos.up.railway.app/api/productos");
            //const response = await Axios.get("http://localhost:8080/api/productos");
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const agregarProductoCarrito = (product) => {
        let listaProductos = JSON.parse(localStorage.getItem('productos')) || [];

        const existingProductIndex = listaProductos.findIndex(p => p.id === product.id);

        if (existingProductIndex !== -1) {
            if (listaProductos[existingProductIndex].cantidad < 20) {
                listaProductos[existingProductIndex].cantidad++;
            } else {
                console.log(`Ya no se puede agregar`);
            }
        } else {
            product.cantidad = 1;
            listaProductos.push(product);
        }

        localStorage.setItem('productos', JSON.stringify(listaProductos));
        console.log(`Producto agregado al Local Storage: ${product.nombre}`);
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
    }, []);

    useEffect(() => {
        filtrarProductos();
    }, [productos, categoria, buscar]);

    return (
        <div className='container-fluid d-flex justify-content-center'>
            <div className="sm:w-100 lg:w-11/12 xl:w-11/12" style={{ overflow: "hidden", marginTop: "110px" }}>
                <input value={buscar} onChange={buscador} type='text' placeholder='Buscar' className='form-control mb-3 fs-3' />

                <div className="row">
                    <div className="col-md-2 col-sm-12 mb-3 p-2">
                        <h2 className='m-2'>Categorias</h2>
                        <div className="form-check form-check-inline fs-3 mx-2">
                            <input onChange={handleOnCheckbox} className="form-check-input" type="checkbox" name='filtro' id="led1" value={'led1'} />
                            <label className="form-check-label" htmlFor="inlineRadio1">led 1</label>
                        </div>
                        <br />
                        <div className="form-check form-check-inline fs-3 mx-2">
                            <input onChange={handleOnCheckbox} className="form-check-input" type="checkbox" name='filtro' id="led2" value={'led2'} />
                            <label className="form-check-label" htmlFor="inlineRadio2">led 2</label>
                        </div>
                    </div>
                    <div className="col-md-10" style={{ height: '77vh', overflowY: 'scroll' }}>
                        {datosFiltrados.length === 0 ? (
                            <div className="flex items-center justify-center mt-20">
                                <svg className="animate-spin h-10 w-10 mr-3 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014 12H0c0 6.627 5.373 12 12 12v-4a7.946 7.946 0 01-6-2.709z"></path>
                                </svg>
                                <span className='font-semibold text-3xl'>Cargando...</span>
                            </div>


                        ) : (
                            <div className="row">
                                {datosFiltrados.map((producto, index) => (
                                    <div className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-4" key={index}>
                                        <figure className="card card-product-grid">
                                            <div className="img-wrap rounded bg-light">
                                                <span className="topbar"></span>
                                                <NavLink to={`/vistaProductosJava/${producto.id}`} activeclassname="active">
                                                    <img className="mix-blend-mode absolute transform hover:scale-105 transition duration-700 ease-out"
                                                        src={`data:image/png;base64, ${producto.imagenes}`}
                                                        width="320"
                                                        height="180"
                                                        alt={producto.nombre}
                                                    />
                                                </NavLink>

                                            </div>
                                            <figcaption className="card-product-info m-3">
                                                <NavLink to={`/vistaProductosJava/${producto.id}`} activeclassname="active" className='title'>
                                                    {producto.nombre}
                                                </NavLink>
                                                <div className="price-wrap">
                                                    <span className="price">${producto.precio}</span>
                                                </div>
                                            </figcaption>
                                            <footer className="card-footer">
                                                <button className="btn btn-lg btn-outline-dark w-100 mt-2 agregarCarrito" onClick={() => agregarProductoCarrito(producto)}>Agregar a carrito</button>
                                            </footer>
                                        </figure>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>



    );
}

export default ProductList;
