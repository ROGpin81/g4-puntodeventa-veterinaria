const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../../db');
require('dotenv').config();

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ mensaje: 'Username y password son requeridos' });
  }

  // Primero buscar el usuario solo por username
  const sql = 'SELECT * FROM usuarios WHERE username = ?';

  pool.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Error en la consulta de login:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }

    if (results.length === 0) {
      return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }

    const usuario = results[0];
    const passwordHash = usuario.password;

    // Aquí se hace el match/verificación de la contraseña con bcrypt
    bcrypt.compare(password, passwordHash, (err, isMatch) => {
      if (err) {
        console.error('Error al comparar contraseña:', err);
        return res.status(500).json({ mensaje: 'Error en el servidor' });
      }

      if (!isMatch) {
        return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
      }

      // Si la contraseña coincide, generar el token
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
});

module.exports = router;
