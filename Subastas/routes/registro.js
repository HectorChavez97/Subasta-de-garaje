const express = require('express');
const router = express.Router();
const User = require('../models/User')

//INSERTAR http://localhost:3000/api/registro/
router.post('/', async (req, res) => {
    try{
        let {
            nombre,
            correo,
            sexo,
            ciudad,
            estado, 
            contrasena
        } = req.body

        if(nombre != undefined && correo != undefined && sexo != undefined && 
            ciudad != undefined && estado != undefined && contrasena != undefined){
                let user = await User.findOne({ correo: req.body.correo });
    
                if(user)  return res.status(400).send('Correo ya registrado!');
    
                else {
                    user = new User({
                        nombre: req.body.nombre,
                        correo: req.body.correo,
                        sexo: req.body.sexo,
                        ciudad: req.body.ciudad,
                        estado: req.body.estado,
                        contrasena: req.body.contrasena
                    });
    
                    await user.save();
                    res.status(201).send(user);
                }
            }
        else return res.status(400).send("Informacion incompleta para terminar el registro")
    }
    catch(err){
        res.status(400).send({
            error: "ocurrió un error",
            detalle: err
        });
    }
})

//OBTENER
router.get("/", (req, res) => {
    //res.status(200)
    if(!req.query.correo) {
        return res.status(400).send('Falta un parametro: email');
    }

    User.findOne({
        correo: req.query.correo
    }).then(doc => 
        {res.json(doc)})
        .catch(err => {
            res.status(500).json(err);
        })
}) 

//ACTUALIZAR
router.put('/', (req, res) => {
    if(!req.query.correo) {
        return res.status(400).send('Falta email');
    }
    User.findOneAndUpdate({
        correo: req.query.correo
    }, req.body, {new:true}).then(doc => {
        res.json(doc)
    }).catch(err=>{res.status(500).json(err)})
})

//BORRAR REGISTRO (por URL ej. http://localhost:3000/api/registro/?correo=TESTalexisoficial@mail.com)
router.delete('/', (req, res) => {
    if(!req.query.correo) {
        return res.status(400).send('Falta email');
    }
    User.findOneAndRemove({
        correo: req.query.correo
    }).then(doc => {
        res.json(doc)
    }).catch(err=>{res.status(500).json(err)})
})

module.exports = router;