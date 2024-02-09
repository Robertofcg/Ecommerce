import React, { useState } from 'react';

const BotonWsp = () => {
    const [texto, setTexto] = useState('');
    const numero = "9513978560"; // Número de teléfono fijo

    const enviarMensaje = () => {
        const textoCodificado = encodeURIComponent(texto);
        const enlace = `https://api.whatsapp.com/send?phone=${numero}&text=${textoCodificado}`;
        window.open(enlace, '_blank').focus();
    };

    return (
        <div className='container-boton'>
            <a href="" onClick={enviarMensaje} className="btn-wsp">
                <img
                    src={require('../assets/images/WhatsApp.png')} // Cambia la ruta de la imagen según la estructura de tu proyecto
                    alt="Botón de WhatsApp"
                    className="botonwsp"
                />
            </a>
        </div>
    );
};

export default BotonWsp;
