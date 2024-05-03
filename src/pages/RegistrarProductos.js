import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function RegistroProducto() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token')); // Verifica si hay un token almacenado

  const [formulario, setFormulario] = useState({
    Nombre: '',
    Cantidad: '',
    Marca: '',
    Modelo: '',
    Voltaje: '',
    Potencia: '',
    Precio: '',
    Lumenes: '',
    Atenuable: false,
    VidaUtil: '',
    Dimensiones: '',
    Angulo: '',
    Descripcion: '',
    ImagenBase64: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Obtener el token del almacenamiento local (o cualquier otro lugar donde lo tengas)
      const token = localStorage.getItem('token'); // Asegúrate de ajustar esta línea según cómo obtienes tu token
      // Configurar el encabezado de la petición con el token
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      // Realizar la petición POST con Axios
      await axios.post('https://ecommerce-k96h.onrender.com/ProductRoute/registrarProducto', formulario, config);
      alert('Producto registrado con éxito');
      // Limpiar el formulario después de enviar los datos
      setFormulario({
        Nombre: '',
        Cantidad: '',
        Marca: '',
        Modelo: '',
        Voltaje: '',
        Potencia: '',
        Precio: '',
        Lumenes: '',
        Atenuable: false,
        VidaUtil: '',
        Dimensiones: '',
        Angulo: '',
        Descripcion: '',
        ImagenBase64: ''
      });
    } catch (error) {
      console.error('Error al registrar el producto:', error);
      alert('Error al registrar el producto. Por favor, inténtelo de nuevo.');
    }
  };

  if (!loggedIn) {
    return <div className="grid place-items-center">
      <div className="text-center text-5xl py-60 mx-50 text-blue-900">
        Necesitas iniciar sesión para acceder a esta página
        <NavLink to="/login" activeclassname="active">
          <br></br>
          <button className="mt-4 cv border-solid border-2 border-blue-900 text-blue-900 text-2xl rounded p-3 hover:bg-blue-900 hover:text-white">
            <b>
              Iniciar Sesión
            </b>
          </button>
        </NavLink>
      </div>

    </div>


  }

  return (
    <div className="py-32 px-10">
      <div className="bg-white p-10 rounded-lg shadow md:w-3/4 lg:w-3/4 mx-auto">
        <h2 className="text-center text-5xl font-bold mb-8">Registro de Producto</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-5">
          <div>
            <label htmlFor="Nombre" className="block mb-2 font-bold text-gray-600 text-2xl">Nombre</label>
            <input type="text" id="Nombre" name="Nombre" value={formulario.Nombre} onChange={handleChange} placeholder="Nombre del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" required />
          </div>
          <div>
            <label htmlFor="Cantidad" className="block mb-2 font-bold text-gray-600 text-2xl">Cantidad</label>
            <input type="number" id="Cantidad" name="Cantidad" value={formulario.Cantidad} onChange={handleChange} placeholder="Cantidad disponible" className="border border-gray-300 shadow p-3 w-full rounded text-xl" required />
          </div>
          <div>
            <label htmlFor="Marca" className="block mb-2 font-bold text-gray-600 text-2xl">Marca</label>
            <input type="text" id="Marca" name="Marca" value={formulario.Marca} onChange={handleChange} placeholder="Marca del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" />
          </div>
          <div>
            <label htmlFor="Modelo" className="block mb-2 font-bold text-gray-600 text-2xl">Modelo</label>
            <input type="text" id="Modelo" name="Modelo" value={formulario.Modelo} onChange={handleChange} placeholder="Modelo del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" />
          </div>
          <div>
            <label htmlFor="Voltaje" className="block mb-2 font-bold text-gray-600 text-2xl">Voltaje</label>
            <input type="text" id="Voltaje" name="Voltaje" value={formulario.Voltaje} onChange={handleChange} placeholder="Voltaje del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" />
          </div>
          <div>
            <label htmlFor="Potencia" className="block mb-2 font-bold text-gray-600 text-2xl">Potencia</label>
            <input type="text" id="Potencia" name="Potencia" value={formulario.Potencia} onChange={handleChange} placeholder="Potencia del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" />
          </div>
          <div>
            <label htmlFor="Precio" className="block mb-2 font-bold text-gray-600 text-2xl">Precio</label>
            <input type="number" id="Precio" name="Precio" value={formulario.Precio} onChange={handleChange} placeholder="Precio del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" />
          </div>
          <div>
            <label htmlFor="Lumenes" className="block mb-2 font-bold text-gray-600 text-2xl">Lúmenes</label>
            <input type="number" id="Lumenes" name="Lumenes" value={formulario.Lumenes} onChange={handleChange} placeholder="Lúmenes del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" />
          </div>
          <div>
            <label htmlFor="Atenuable" className="block mb-2 font-bold text-gray-600 text-2xl">Atenuable</label>
            <select id="Atenuable" name="Atenuable" value={formulario.Atenuable} onChange={handleChange} className="border border-gray-300 shadow p-3 w-full rounded text-xl">
              <option value={1}>Sí</option>
              <option value={0}>No</option>
            </select>
          </div>
          <div>
            <label htmlFor="VidaUtil" className="block mb-2 font-bold text-gray-600 text-2xl">Vida Útil</label>
            <input type="text" id="VidaUtil" name="VidaUtil" value={formulario.VidaUtil} onChange={handleChange} placeholder="Vida útil del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" />
          </div>
          <div>
            <label htmlFor="Dimensiones" className="block mb-2 font-bold text-gray-600 text-2xl">Dimensiones</label>
            <input type="text" id="Dimensiones" name="Dimensiones" value={formulario.Dimensiones} onChange={handleChange} placeholder="Dimensiones del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" />
          </div>
          <div>
            <label htmlFor="Angulo" className="block mb-2 font-bold text-gray-600 text-2xl">Ángulo</label>
            <input type="number" id="Angulo" name="Angulo" value={formulario.Angulo} onChange={handleChange} placeholder="Ángulo del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" />
          </div>
          <div className="col-span-2">
            <label htmlFor="Descripcion" className="block mb-2 font-bold text-gray-600 text-2xl">Descripción</label>
            <textarea id="Descripcion" name="Descripcion" value={formulario.Descripcion} onChange={handleChange} placeholder="Descripción del producto" className="border border-gray-300 shadow p-3 w-full rounded text-xl" rows="4"></textarea>
          </div>
          <div className="col-span-2">
            <label htmlFor="Descripcion" className="block mb-2 font-bold text-gray-600 text-2xl">Descripción</label>
            <textarea id="ImagenBase64" name="ImagenBase64" value={formulario.ImagenBase64} onChange={handleChange} placeholder="Imagen en base64" className="border border-gray-300 shadow p-3 w-full rounded text-xl" rows="4"></textarea>
          </div>
          <button type="submit" className="col-span-2 w-full block bg-blue-500 text-white font-bold p-4 rounded-lg text-2xl">Registrar Producto</button>
        </form>
      </div>
    </div>

  );
}

export default RegistroProducto;
