const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.get('/', async (req, res) => {
    try{
        let {
            correo, 
            contrasena
        } = req.body

        if(correo != undefined && contrasena != undefined){
            let user = await User.findOne({correo: req.body.correo}).findOne({contrasena: req.body.contrasena})

            if(!user) return res.status(400).send('Datos incorrectos!');
            else{

                res.status(200).send(user);
            }
        }
        else return res.status(400).send("Usuario y contrasena necesarios")
    }
    catch(err){
        res.status(400).send({
            error: "ocurrió un error",
            detalle: err
        });
    }
})

module.exports = router;