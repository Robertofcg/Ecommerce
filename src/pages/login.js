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
          window.location.href = '/Ecommerce/#//dashboard'; 
        } catch (error) {
          if (error.response) {
            setError(error.response.data.message);
          } else {
            setError('Error de red: No se pudo conectar al servidor');
          }
        }
      };
    return (
        <div class="flex justify-center items-center p-4">
            <div class="bg-white shadow w-full p-4 rounded shadow-2xl text-gray-700 container w-25">
                <div class="flex justify-end">
                    <img src="https://www.ns-logo.com/wp-content/uploads/2020/07/logo-icon-png-8.png" alt="" class="w-8" />
                </div>

                <p class="text-center pb-2 text-4xl">Inicio de Sesión</p>

                <form onSubmit={handleSubmit} class="my-5">

                    <div class="pb-5">
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} class="block w-full p-2 rounded shadow bg-gray-100 text-2xl" placeholder="Usuario" />
                    </div>

                    <div class="pb-5">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} class="block w-full p-2 rounded shadow bg-gray-100 text-2xl" placeholder="Contraseña" />
                    </div>

                    <button type="submit" class="bg-blue-500 p-2 w-full text-white rounded text-2xl">LogIn</button>
                </form>
            </div>
        </div>






    );
};

export default Login;
