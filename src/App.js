import './App.css';
import './style/inicio.css';
import './style/carrucel.css';
import './style/targetas.css';
import './style/botonWsp.css';
import './style/carrito.css';
import './style/products.css';
import './style/vistaProducto.css';

import React from 'react';
import Navbar from './components/navbar';
import Wsp from './components/botonWsp';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/inicio';
import Catalogo from './pages/productos';
import VistaProductos from './pages/vistaProducto';
import Login from './pages/login';
import RegistrarProducto from './pages/RegistrarProductos';
import RegistrarProductoJava from './pages/RegistrarProductosJava';
import ProductosJava from './pages/productos copy';
import VistaProductosJava from './pages/vistaProducto copy';


function App() {
  return (
    <div className="App" style={{ minHeight: "99.947vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div className="content-wrapper" style={{ flex: 1, overflowY: "auto" }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/vistaProductos/:id" element={<VistaProductos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrarProducto" element={<RegistrarProducto />} />
          <Route path="/registrarProductoJava" element={<RegistrarProductoJava />} />
          <Route path="/productosJava" element={<ProductosJava />} />
          <Route path="/vistaProductosJava/:id" element={<VistaProductosJava />} />
        </Routes>
      </div>
      <Wsp />
      <Footer />
    </div>
  );
}

export default App;
