import mysql from 'mysql2';

// Configura la conexión a tu base de datos ElephantSQL
const connection = mysql.createConnection({
  host: 'tu-host',
  user: 'tu-usuario',
  password: 'tu-contraseña',
  database: 'tu-base-de-datos'
});

// Conecta a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

// Realiza una consulta a la base de datos
connection.query('SELECT * FROM tu_tabla', (err, results, fields) => {
  if (err) {
    console.error('Error al ejecutar la consulta: ', err);
    return;
  }
  console.log('Resultados de la consulta: ', results);
});

// Cierra la conexión a la base de datos cuando hayas terminado
connection.end();
