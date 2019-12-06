const User      = require('../models/User')
const express   = require('express');
const router    = express.Router();

router.put('/', (req, res) => {
    if(!req.query.contrasena) {
        return res.status(400).send('Falta contrasena');
    }
    User.findOneAndUpdate({
        contrasena: req.query.contrasena
    }, req.body, {new:true}).then(doc => {
        res.json(doc)
    }).catch(err=>{res.status(500).json(err)})
})