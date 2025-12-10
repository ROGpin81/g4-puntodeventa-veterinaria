const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'VeterinariaBaseDatosPF'
});

pool.getConnection((error, conexion) => {
  if (error) {
    console.log('Error de conexion a la base de datos');
  } else {
    console.log('Conexion exitosa a la base de datos');
    conexion.release();
  }
});

module.exports = pool;
