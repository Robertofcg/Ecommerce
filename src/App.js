import './App.css';
import './style/inicio.css';
import './style/carrucel.css';
import './style/targetas.css';
import './style/botonWsp.css';

import React from 'react';
import Navbar from './components/navbar';
import Wsp from './components/botonWsp';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Routes, Route } from 'react-router-dom';
import Inicio from './pages/inicio';
import Catalogo from './pages/productos';

function App() {
  return (
    <Router basename="/Ecommerce">
      <div className="App" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <div className="content-wrapper" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />} />
            {/* Asegúrate de tener las rutas configuradas correctamente */}
          </Routes>
        </div>
        <Wsp />
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
