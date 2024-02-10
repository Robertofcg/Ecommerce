import React from 'react';

const BotonWsp = () => {
    const numero = "9513978560"; // Número de teléfono fijo

    const enviarMensaje = () => {
        const enlace = `https://api.whatsapp.com/send?phone=${numero}`;
        window.open(enlace, '_blank').focus();
    };

    return (
        <div className='container-boton'>
            <button onClick={enviarMensaje} className="bt-wsp">
                <img
                    src={require('../assets/images/WhatsApp.png')} // Cambia la ruta de la imagen según la estructura de tu proyecto
                    alt="Botón de WhatsApp"
                    className="botonwsp"
                />
            </button>
        </div>
    );
};

export default BotonWsp;
