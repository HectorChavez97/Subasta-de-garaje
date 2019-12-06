const jwt       = require('jsonwebtoken')
const express   = require('express');
const User      = require('../models/User')
const router    = express.Router();

router.post('/', async (req, res) => {
    try{
        let {
            correo, 
            contrasena
        } = req.body

        if(correo != undefined && contrasena != undefined){
            let user = await User.findOne({correo: req.body.correo}).findOne({contrasena: req.body.contrasena})

            if(!user){
                return res.status(404).send('Datos incorrectos');
            } 

            let token = jwt.sign({user}, 'secretKey', {expiresIn: '5m'});

            res.status(200).cookie('refreshtoken' , token, { httpOnly: false}).send({
                token
            })
        }
        
        else return res.status(404).send("Usuario y contrasena necesarios")
    }
    catch(err){
        res.status(400).send({
            error: "ocurrió un error",
            detalle: err
        });
    }
})

module.exports = router;