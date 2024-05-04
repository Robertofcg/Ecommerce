import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://ecommerce-k96h.onrender.com/ProductRoute/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      window.location.href = '/Ecommerce/#/registrarProducto';
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('Error de red: No se pudo conectar al servidor');
      }
    }
  };
  return (
    <div className='py-32'>
      <div className="flex justify-center items-center p-4 ">
        <div className="bg-white shadow p-4 rounded shadow-2xl text-gray-700 sm:w-4/6 md:w-4/6 lg:w-2/5 w-full">
          <div className="flex justify-end">
            <img src="https://www.ns-logo.com/wp-content/uploads/2020/07/logo-icon-png-8.png" alt="" className="w-8" />
          </div>

          <p className="text-center pb-2 text-4xl">Inicio de Sesión</p>

          <form onSubmit={handleSubmit} className="my-5">

            <div className="pb-5">
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="block w-full p-2 rounded shadow bg-gray-100 text-2xl" placeholder="Usuario" />
            </div>

            <div className="pb-5">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-full p-2 rounded shadow bg-gray-100 text-2xl" placeholder="Contraseña" />
            </div>

            <button type="submit" className="bg-blue-500 p-2 w-full text-white rounded text-2xl">LogIn</button>
          </form>
        </div>
      </div>
    </div>


  );
};

export default Login;
