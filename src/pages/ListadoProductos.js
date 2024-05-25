import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const ListadoProductos = () => {
    const [productos, setProductos] = useState([]);
    const [showEditarPopup, setShowEditarPopup] = useState(false);
    const [idProductoEditar, setIdProductoEditar] = useState(null);
    const [productosId, setProductosId] = useState(null);

    const obtenerProductos = async () => {
        try {
            //const response = await Axios.get("https://ecommerce-productos.up.railway.app/api/productos");
            const response = await Axios.get("http://localhost:8080/api/productos");
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const obtenerProductoParaEditar = async () => {
        try {
            //const response = await Axios.get(`https://ecommerce-productos.up.railway.app/api/productos/${idProductoEditar}`);
            const response = await Axios.get(`http://localhost:8080/api/productos/${idProductoEditar}`);

            setProductosId(response.data);
        } catch (error) {
            console.error('Error al obtener el producto para editar:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            //const urlBase = "http://localhost:8080/api/productos/insertar";
            await Axios.put(`https://ecommerce-productos.up.railway.app/api/productos/${idProductoEditar}`, productosId, config);
            //await Axios.put(`http://localhost:8080/api/productos/${idProductoEditar}`, productosId, config);
            alert('Producto actualizado con éxito');
            obtenerProductos();
        } catch (error) {
            console.error('Error al registrar el producto:', error);
            alert('Error al registrar el producto. Por favor, inténtelo de nuevo.');
        }
    };

    const eliminarProducto = async (id) => {
        await axios.delete(`https://ecommerce-productos.up.railway.app/api/productos/${id}`);
        //await axios.delete(`http://localhost:8080/api/productos/${id}`);

        obtenerProductos();
    }

    useEffect(() => {
        obtenerProductos();
    }, []);

    useEffect(() => {
        if (idProductoEditar) {
            obtenerProductoParaEditar();
        }
    }, [idProductoEditar]);

    const abrirEditarPopup = (id) => {
        setIdProductoEditar(id);
        setShowEditarPopup(true);
    };

    const cerrarEditarPopup = () => {
        setShowEditarPopup(false);
        setProductosId(null);
    };

    const handleEditarProducto = async () => {
        try {
            // Realiza la petición de edición del producto y luego actualiza la lista de productos
            // ...
            // await Axios.put(...);
            obtenerProductos(); // Actualiza la lista de productos después de editar
            cerrarEditarPopup(); // Cierra la ventana emergente de editar
        } catch (error) {
            console.error('Error al editar el producto:', error);
            // Muestra un mensaje de error al usuario si es necesario
        }
    };

    return (
        <div className="container bg-white p-5 shadow" style={{ marginTop: "110px" }}>
            <div className="overflow-x-auto"> {/* Key for horizontal scrolling on small screens */}
                <table className="w-full table-auto bg-white">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-700 text-xl xl:text-2xl">
                            <th className="px-4 py-3">Producto</th>
                            <th className="px-4 py-3 ">Nombre</th> {/* Hide on small screens hidden md:table-cell*/}
                            <th className="px-4 py-3">Precio</th>
                            <th className="px-4 py-3 text-center">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto, index) => (
                            <tr key={index} className="border-b border-gray-200">
                                <td className="px-4 py-4">
                                    <NavLink to={`/vistaProductosJava/${producto.id}`} activeclassname="active">
                                        <img src={`data:image/png;base64, ${producto.imagenes}`} alt={producto.nombre} className="w-28 h-22 object-cover rounded-lg shadow-md" />
                                    </NavLink>
                                </td>
                                <td className="px-4 py-4 "> {/* Hide on small screens hidden md:table-cell*/}
                                    <a className="font-semibold text-lg xl:text-xl text-gray-800 no-underline">
                                        {producto.nombre}
                                    </a>
                                </td>
                                <td className="px-4 py-4 text-lg xl:text-2xl text-gray-800">
                                    ${producto.precio}
                                </td>
                                <td className="px-4 py-4 flex flex-col md:flex-row md:justify-center md:items-center mt-3">
                                    <button
                                        className="text-yellow-500 hover:text-red-700 text-lg xl:text-xl mt-2 font-semibold px-4 py-1"
                                        onClick={() => abrirEditarPopup(producto.id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="text-red-500 hover:text-red-700 text-lg xl:text-xl mt-2 font-semibold px-4 py-1"
                                        onClick={() => eliminarProducto(producto.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Ventana emergente de editar */}
                {showEditarPopup && productosId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto px-5">
                        <div className="fixed inset-0 bg-gray-700 opacity-75"></div>
                        <div className="relative bg-white rounded-lg shadow-2xl w-full sm:w-3/4 h-3/4 overflow-auto">
                            <button onClick={cerrarEditarPopup} className="text-gray-500 hover:text-gray-700 absolute top-0 right-0 m-6">
                                <svg className="w-8 h-8 fill-current" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10.707 10l4.146-4.146a.5.5 0 1 0-.708-.708L10 9.293 5.854 5.146a.5.5 0 1 0-.708.708L9.293 10l-4.147 4.146a.5.5 0 0 0 .708.708L10 10.707l4.146 4.147a.5.5 0 0 0 .708-.708L10.707 10z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <div className="p-10">
                                <h1 className="text-5xl font-bold mb-8 text-center text-gray-800">Editar Producto</h1>
                                <div className="overflow-x-auto">
                                    <div className="max-h-[48rem] overflow-y-auto">
                                        {/* Contenido del formulario */}
                                        <form className="grid grid-cols-2 md:grid-cols-3 gap-5" onSubmit={handleSubmit}>
                                            <div>
                                                <label htmlFor="nombre" className="block mb-2 font-bold text-gray-600 text-2xl">Nombre</label>
                                                <input
                                                    type="text"
                                                    id="nombre"
                                                    name="nombre"
                                                    value={productosId && productosId.nombre ? productosId.nombre : ''}
                                                    placeholder="Nombre del producto"
                                                    className="border border-gray-300 shadow p-3 w-full rounded text-xl"
                                                    onChange={(e) => setProductosId({ ...productosId, nombre: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="cantidad" className="block mb-2 font-bold text-gray-600 text-2xl">Cantidad</label>
                                                <input
                                                    type="number"
                                                    id="cantidad"
                                                    name="cantidad"
                                                    value={productosId && productosId.cantidad ? productosId.cantidad : ''}
                                                    placeholder="Cantidad disponible"
                                                    className="border border-gray-300 shadow p-3 w-full rounded text-xl"
                                                    onChange={(e) => setProductosId({ ...productosId, cantidad: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="precio" className="block mb-2 font-bold text-gray-600 text-2xl">Marca</label>
                                                <input
                                                    type="text"
                                                    id="marca"
                                                    name="marca"
                                                    value={productosId && productosId.marca ? productosId.marca : ''}
                                                    placeholder="Marca del producto"
                                                    className="border border-gray-300 shadow p-3 w-full rounded text-xl"
                                                    onChange={(e) => setProductosId({ ...productosId, marca: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="modelo" className="block mb-2 font-bold text-gray-600 text-2xl">Modelo</label>
                                                <input
                                                    type="text"
                                                    id="modelo"
                                                    name="modelo"
                                                    value={productosId && productosId.modelo ? productosId.modelo : ''}
                                                    placeholder="Modelo del producto"
                                                    className="border border-gray-300 shadow p-3 w-full rounded text-xl"
                                                    onChange={(e) => setProductosId({ ...productosId, modelo: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="voltaje" className="block mb-2 font-bold text-gray-600 text-2xl">Voltaje</label>
                                                <input
                                                    type="text"
                                                    id="voltaje"
                                                    name="voltaje"
                                                    value={productosId && productosId.voltaje ? productosId.voltaje : ''}
                                                    placeholder="Voltaje del producto"
                                                    className="border border-gray-300 shadow p-3 w-full rounded text-xl"
                                                    onChange={(e) => setProductosId({ ...productosId, voltaje: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="potencia" className="block mb-2 font-bold text-gray-600 text-2xl">Potencia</label>
                                                <input
                                                    type="number"
                                                    id="potencia"
                                                    name="potencia"
                                                    value={productosId && productosId.potencia ? productosId.potencia : ''}
                                                    placeholder="Potencia del producto"
                                                    className="border border-gray-300 shadow p-3 w-full rounded text-xl"
                                                    onChange={(e) => setProductosId({ ...productosId, potencia: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="precio" className="block mb-2 font-bold text-gray-600 text-2xl">Precio</label>
                                                <input
                                                    type="number"
                                                    id="precio"
                                                    name="precio"
                                                    value={productosId && productosId.precio ? productosId.precio : ''}
                                                    placeholder="Precio del producto"
                                                    className="border border-gray-300 shadow p-3 w-full rounded text-xl"
                                                    onChange={(e) => setProductosId({ ...productosId, precio: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="lumenes" className="block mb-2 font-bold text-gray-600 text-2xl">Lúmenes</label>
                                                <input
                                                    type="number"
                                                    id="lumenes"
                                                    name="lumenes"
                                                    value={productosId && productosId.lumenes ? productosId.lumenes : ''}
                                                    placeholder="Lúmenes del producto"
                                                    className="border border-gray-300 shadow p-3 w-full rounded text-xl"
                                                    onChange={(e) => setProductosId({ ...productosId, lumenes: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="atenuable" className="block mb-2 font-bold text-gray-600 text-2xl">Atenuable</label>
                                                <input
                                                    type="text"
                                                    id="atenuable"
                                                    name="atenuable"
                                                    value={productosId && productosId.atenuable ? productosId.atenuable : ''}
                                                    placeholder="Atenuable"
                                                    className="border border-gray-300 shadow p-3 w-full rounded text-xl"
                                                    onChange={(e) => setProductosId({ ...productosId, precio: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="vidaUtil" className="block mb-2 font-bold text-gray-600 text-2xl">Vida Util</label>
                                                <input
                                                    type="text"
                                                    id="vidaUtil"
                                                    name="vidaUtil"
                                                    value={productosId && productosId.vidaUtil ? productosId.vidaUtil : ''}
                                                    placeholder="Vida util del producto"
                                                    className="border border-gray-300 shadow p-3 w-full rounded text-xl"
                                                    onChange={(e) => setProductosId({ ...productosId, vidaUtil: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="dimensiones" className="block mb-2 font-bold text-gray-600 text-2xl">Dimensiones</label>
                                                <input
                                                    type="text"
                                                    id="dimensiones"
                                                    name="dimensiones"
                                                    value={productosId && productosId.dimensiones ? productosId.dimensiones : ''}
                                                    placeholder="Dimensiones del producto"
                                                    className="border border-gray-300 shadow p-3 w-full rounded text-xl"
                                                    onChange={(e) => setProductosId({ ...productosId, dimensiones: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="angulo" className="block mb-2 font-bold text-gray-600 text-2xl">Angulo</label>
                                                <input
                                                    type="number"
                                                    id="angulo"
                                                    name="angulo"
                                                    value={productosId && productosId.angulo ? productosId.angulo : ''}
                                                    placeholder="Angulo del producto"
                                                    className="border border-gray-300 shadow p-3 w-full rounded text-xl"
                                                    onChange={(e) => setProductosId({ ...productosId, angulo: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="categoria" className="block mb-2 font-bold text-gray-600 text-2xl">Categoria</label>
                                                <input
                                                    type="text"
                                                    id="categoria"
                                                    name="categoria"
                                                    value={productosId && productosId.categoria ? productosId.categoria : ''}
                                                    placeholder="Categoria del producto"
                                                    className="border border-gray-300 shadow p-3 w-full rounded text-xl"
                                                    onChange={(e) => setProductosId({ ...productosId, categoria: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="descripcion" className="block mb-2 font-bold text-gray-600 text-2xl">Descripcion</label>
                                                <textarea id="descripcion" name="descripcion" value={productosId && productosId.descripcion ? productosId.descripcion : ''}
                                                    onChange={(e) => setProductosId({ ...productosId, descripcion: e.target.value })}
                                                    placeholder="Descripción del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" rows="4" required></textarea>

                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 mt-5">
                                                <button type="submit" className="text-2xl w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg focus:outline-none focus:shadow-outline">Actualizar Producto</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                )}
            </div>
        </div>

    );
};

export default ListadoProductos;
