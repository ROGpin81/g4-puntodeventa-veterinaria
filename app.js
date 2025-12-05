const express = require('express');
const app = express();
const PORT = 3000;
const mysql = require('mysql2');

app.use(express.json());

//Conexion a base de datos 
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'alienware1070',
    database:'VeterinariaBaseDatosPF'

})

//Prueba de conexion 

pool.getConnection((error,conexion)=>{
    if(error){
        console.log('Error de conexion a la base de datos')
    }else{
        console.log('Conexion exitosa......')
    }
});


//Prueba de servidor 
app.get('/usuarios',(req, res)=>{
    const sql = 'SELECT idusuario,username,email,password FROM usuarios';

    pool.query(sql,(err,results)=>{
        if(err){
            console.log('Error en la consulta sql');
            res.status(500).json({status:500,message:'Error en la consulta sql......'});

        }else{
            res.status(200).json({status:200,message:'Success',data:results});
        }

    })
});
 
app.post('/usuarios',(req,res)=>{
    const usuarios = req.body;
    if(!usuarios.idusuario || !usuarios.username || !usuarios.email || !usuarios.password ){
        res.status(200).json({status:400,message:'Los parametros datos son requeridos '});
    }
    else{
        const sql = 'INSERT INTO usuarios (username , email, password) VALUES(?,?,?);';
        pool.query(sql,[usuarios.username,usuarios.email,usuarios.password],(err,results)=>{
            if(err){
            console.log('Error en la consulta sql');
            res.status(500).json({status:500,message:'Error en la consulta sql......'});

        }else{
            res.status(200).json({status:200,message:'Success',data:usuarios});
        }




        });
    }

});

app.get('/llamada',(req,res)=>{
    return res.send('Llamada al 911');
})

//Fin de prueba de servidor
app.listen(PORT,()=>{
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

