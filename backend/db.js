const mysql = require('mysql2');
require('dotenv').config();

//Pool de conexiones
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'VeterinariaBaseDatosPF'
});

// Prueba de conexión (solo para ver en consola al iniciar)
pool.getConnection((error, conexion) => {
  if (error) {
    console.error('Error de conexión a la base de datos:', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
    conexion.release();
  }
});

module.exports = pool;
