const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./src/routes/auth.routes');
const productoRoutes = require('./src/routes/producto.routes');
const clienteRoutes = require('./src/routes/cliente.routes');

require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/clientes', clienteRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: 'API Punto de Venta Veterinaria funcionando' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
