const express = require('express');
const app = express();
const PORT = 3000; 

//Prueba de servidor 
app.get('/',(req, res)=>{
    res.send('G4-Iniciando nuestro proyecto de punto de venta para tienda de veterinarias');
});


app.listen(PORT,()=>{
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});