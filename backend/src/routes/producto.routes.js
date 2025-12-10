const express = require('express');
const pool = require('../../db');
const verificarToken = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', verificarToken, (req, res) => {
  const sql = 'SELECT * FROM Producto';
  pool.query(sql, (err, results) => {
    if (err) {
      console.error('Error obteniendo productos:', err);
      return res.status(500).json({ mensaje: 'Error en el servidor' });
    }
    res.json(results);
  });
});

router.post('/', verificarToken, (req, res) => {
  const { Nombre, Descripcion, Precio, Stock, CategoriaProducto_idCategorias } = req.body;

  const sql = `
    INSERT INTO Producto (Nombre, Descripcion, Precio, Stock, CategoriaProducto_idCategorias)
    VALUES (?, ?, ?, ?, ?)
  `;

  pool.query(
    sql,
    [Nombre, Descripcion, Precio, Stock, CategoriaProducto_idCategorias],
    (err, result) => {
      if (err) {
        console.error('Error insertando producto:', err);
        return res.status(500).json({ mensaje: 'Error en el servidor' });
      }

      res.status(201).json({
        mensaje: 'Producto creado correctamente',
        idProducto: result.insertId
      });
    }
  );
});

module.exports = router;




