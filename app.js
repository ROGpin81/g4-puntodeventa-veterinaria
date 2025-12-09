const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;
const SECRET_KEY = 'pDucMAA7mzYhq17oSK2ipgmTuO2k30lkjhv1dIZt';

app.use(express.json());



//Conexion a base de datos 
const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'RngU0nZC2K',
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





// Creación de middleware
const middleware = (req, res, next) =>{
    const parametroHeader = req.headers['elparametro'];

    if(!parametroHeader){
        return res.status(401).json({status:401, message:'El parametro es obligatorio'});
    }
    else{
        next();
    }
}

// Autorizacion del Header
const authMiddleware = (erq, res, next)=>{
    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(401).json({status:401, message:'El token es obligatorio'});
    }

    next();
}

app.get('/test', middleware, (req, res)=>{
    res.send('Hello');
});





// Encriptado 
app.get('/gethash/:plainText', async (req, res)=>{
    const plainText = req.params.plainText;
    const saltRound = 10;
    const hash = await bcrypt.hash(plainText,saltRound);

    res.send(hash);
});

app.post('/login',async (req, res)=>{
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({status:400, message:'El usuario y contraseña son requeridos'});
    }

    const sql = 'select * from usuarios where username=? OR email=?';
    pool.query(sql, [username,username], async (err, results)=>{
        if(err) {
            return res.status(500).json({status:500, message:'Error en la consulta...'});
        }

        if(results.length===0){
            return res.status(401).json({status:401, message:'Credenciales faltantes'});
        }

        let user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
             return res.status(401).json({status:401, message:'Credenciales invalidas'});
        }

        const token = jwt.sign({username: user.username},SECRET_KEY,{expiresIn: '5m'});
        res.status(200).json({status:200, message:'success', data: token});

    });
});






//Prueba de servidor 
app.get('/usuarios',(req, res)=>{
    const sql = 'SELECT idusuario,username,email,password FROM usuarios';

    pool.query(sql,(err,results)=>{
        if(err){
            console.log('Error en la consulta sql');
            res.status(500).json({status:500,message:'Error en la consulta sql'});

        }else{
            res.status(200).json({status:200,message:'Success',data:results});
        }

    })
});
 
app.post('/usuarios',(req,res)=>{
    const usuarios = req.body;
    if(!usuarios.username || !usuarios.email || !usuarios.password ){
        res.status(200).json({status:400,message:'Los parametros datos son requeridos '});
    }
    else{
        const sql = 'INSERT INTO usuarios (username , email, password) VALUES(?,?,?);';
        pool.query(sql,[usuarios.username,usuarios.email,usuarios.password],(err,results)=>{
            if(err){
            console.log('Error en la consulta sql');
            res.status(500).json({status:500,message:'Error en la consulta sql......'});

        }else{
            res.status(200).json({status:200,message:'success',data:usuarios});
        }

        });
    }

});

app.put('/usuarios/:idusuarios', (req, res)=>{
    const idusuario = req.params.idusuario;
    const usuarios = req.body;

    if (!usuarios.username || !usuarios.email || !usuarios.password) {
        res.status(400).json({status:400, message: 'Todos los campos son requeridos'})
    } else {

        const sql = 'UPDATE usuarios SET username = ?, email = ?, password = ? WHERE idusuarios = ?';
        pool.query(sql, [usuarios.username, usuarios.email, usuarios.password], (err, results) => {

            if(err) {
                console.log('Error en la consulta');
                res.status(500).json({status:500, message: 'Error en la consulta SQL'});
            } else {

                if (results.affectedRows === 0) {
                    res.status(404).json({status:400, message: 'Usuario no encontrado'});
                } else {
                    res.status(200).json({status: 200, message: 'Usuario actualizado correctamente', data: usuarios});
                }
            }


        })
    }
});


app.get('/llamada',(req,res)=>{
    return res.send('Llamada al 911');
})

//Fin de prueba de servidor
app.listen(PORT,()=>{
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

