const express = require('express');
const jwt = require('jsonwebtoken');
const pool = require('../../db');
require('dotenv').config();

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ mensaje: 'Username y password son requeridos' });
  }

  const sql = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';

  pool.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Error en la consulta de login:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const usuario = results[0];

    const payload = {
      idusuario: usuario.idusuario,
      username: usuario.username
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.json({
      mensaje: 'Login exitoso',
      token
    });
  });
});

module.exports = router;
