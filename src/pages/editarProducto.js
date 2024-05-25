import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function EditarProducto() {
    const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

    const [empleado, setEmpleado] = useState({
        nombre: '',
        cantidad: '',
        marca: '',
        modelo: '',
        voltaje: '',
        potencia: '',
        precio: '',
        lumenes: '',
        atenuable: false,
        vidaUtil: '',
        dimensiones: '',
        angulo: '',
        descripcion: '',
        imagenes: ''
    });

    const { nombre, cantidad, marca, modelo, voltaje, potencia, precio, lumenes, atenuable, vidaUtil, dimensiones, angulo, descripcion } = empleado;

    const CambiosInput = (e) => {
        const { name, value, type, checked } = e.target;
        setEmpleado({
            ...empleado,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const ConvertirImagen = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            // Convertir la imagen a base64
            const base64String = reader.result.split(',')[1];
            // Actualizar el campo ImagenBase64 del estado formulario
            setEmpleado({ ...empleado, imagenes: base64String });
        };
        reader.readAsDataURL(file);
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
            await axios.post("https://ecommerce-productos.up.railway.app/api/productos/insertar", empleado, config);
            alert('Producto registrado con éxito');
        } catch (error) {
            console.error('Error al registrar el producto:', error);
            alert('Error al registrar el producto. Por favor, inténtelo de nuevo.');
        }
    };

    if (!loggedIn) {
        return (
            <div className="grid place-items-center mt-24 pt-24">
                <div className="text-center text-5xl py-60 mx-50 text-blue-900">
                    Necesitas iniciar sesión para acceder a esta página
                    <NavLink to="/login" activeClassName="active">
                        <br></br>
                        <button className="mt-4 cv border-solid border-2 border-blue-900 text-blue-900 text-2xl rounded p-3 hover:bg-blue-900 hover:text-white">
                            <b>Iniciar Sesión</b>
                        </button>
                    </NavLink>
                </div>
            </div>
        );
    }

    return (
        <div className="py-32 px-10 mt-24 pt-24">
            <div className="bg-white p-10 rounded-lg shadow md:w-3/4 lg:w-3/4 mx-auto">
                <h2 className="text-center text-5xl font-bold mb-8">Edición de Producto</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="Nombre" className="block mb-2 font-bold text-gray-600 text-2xl">Nombre</label>
                        <input type="text" id="nombre" name="nombre" value={nombre} onChange={CambiosInput} placeholder="Nombre del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" required />
                    </div>
                    <div>
                        <label htmlFor="cantidad" className="block mb-2 font-bold text-gray-600 text-2xl">cantidad</label>
                        <input type="number" id="cantidad" name="cantidad" value={cantidad} onChange={CambiosInput} placeholder="cantidad disponible" className="border border-gray-300 shadow p-3 w-full rounded text-xl" required />
                    </div>
                    <div>
                        <label htmlFor="marca" className="block mb-2 font-bold text-gray-600 text-2xl">marca</label>
                        <input type="text" id="marca" name="marca" value={marca} onChange={CambiosInput} placeholder="marca del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" required />
                    </div>
                    <div>
                        <label htmlFor="modelo" className="block mb-2 font-bold text-gray-600 text-2xl">modelo</label>
                        <input type="text" id="modelo" name="modelo" value={modelo} onChange={CambiosInput} placeholder="modelo del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" required />
                    </div>
                    <div>
                        <label htmlFor="voltaje" className="block mb-2 font-bold text-gray-600 text-2xl">voltaje</label>
                        <input type="text" id="voltaje" name="voltaje" value={voltaje} onChange={CambiosInput} placeholder="voltaje del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" required />
                    </div>
                    <div>
                        <label htmlFor="potencia" className="block mb-2 font-bold text-gray-600 text-2xl">potencia</label>
                        <input type="number" id="potencia" name="potencia" value={potencia} onChange={CambiosInput} placeholder="potencia del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" required />
                    </div>
                    <div>
                        <label htmlFor="precio" className="block mb-2 font-bold text-gray-600 text-2xl">precio</label>
                        <input type="number" id="precio" name="precio" value={precio} onChange={CambiosInput} placeholder="precio del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" required />
                    </div>
                    <div>
                        <label htmlFor="lumenes" className="block mb-2 font-bold text-gray-600 text-2xl">Lúmenes</label>
                        <input type="number" id="lumenes" name="lumenes" value={lumenes} onChange={CambiosInput} placeholder="Lúmenes del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" required />
                    </div>
                    <div>
                        <label htmlFor="atenuable" className="block mb-2 font-bold text-gray-600 text-2xl">atenuable</label>
                        <select id="atenuable" name="atenuable" value={atenuable} onChange={CambiosInput} className="border border-gray-300 shadow p-3 w-full rounded text-xl">
                            <option value={true}>Sí</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="vidaUtil" className="block mb-2 font-bold text-gray-600 text-2xl">Vida Útil</label>
                        <input type="text" id="vidaUtil" name="vidaUtil" value={vidaUtil} onChange={CambiosInput} placeholder="Vida útil del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" required />
                    </div>
                    <div>
                        <label htmlFor="dimensiones" className="block mb-2 font-bold text-gray-600 text-2xl">dimensiones</label>
                        <input type="text" id="dimensiones" name="dimensiones" value={dimensiones} onChange={CambiosInput} placeholder="dimensiones del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" required />
                    </div>
                    <div>
                        <label htmlFor="angulo" className="block mb-2 font-bold text-gray-600 text-2xl">Ángulo</label>
                        <input type="number" id="angulo" name="angulo" value={angulo} onChange={CambiosInput} placeholder="Ángulo del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" required />
                    </div>
                    <div className="col-span-2">
                        <label htmlFor="descripcion" className="block mb-2 font-bold text-gray-600 text-2xl">Descripción</label>
                        <textarea id="descripcion" name="descripcion" value={descripcion} onChange={CambiosInput} placeholder="Descripción del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" rows="4" required></textarea>
                    </div>
                    <div>
                        <label htmlFor="imagenes" className="block mb-2 font-bold text-gray-600 text-2xl">Imagen</label>
                        <input type="file" id="imagenes" name="imagenes" accept="image/*" onChange={ConvertirImagen} placeholder="Imagen del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" required />
                    </div>
                    <button type="submit" className="col-span-2 w-full block bg-blue-500 text-white font-bold p-4 rounded-lg text-2xl">Registrar Producto</button>
                </form>
            </div>
        </div>
    );
}

export default EditarProducto;
