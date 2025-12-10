const express = require('express');
const pool = require('../../db');
const verificarToken = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', verificarToken, (req, res) => {
  const sql = 'SELECT * FROM Cliente';
  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error obteniendo clientes:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }
    res.json(results);
  });
});

router.post('/', verificarToken, (req, res) => {
  const { Nombre, Telefono } = req.body;

  const sql = 'INSERT INTO Cliente (Nombre, Telefono) VALUES (?, ?)';

  pool.query(sql, [Nombre, Telefono], (err, result) => {
    if (err) {
      console.error('Error insertando cliente:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }

    res.status(201).json({
      mensaje: 'Cliente creado correctamente',
      idCliente: result.insertId
    });
  });
});

module.exports = router;
