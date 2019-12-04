const jwt       = require('jsonwebtoken')
const verificar = require('../middlewares/Auth')
const express   = require('express');
const Product  = require('../models/Product')
const router    = express.Router();


router.get('/', verificarToken, async (req, res) => {
    let products = await Product.find().limit(10).sort('created') 

    try {
        let token = await jwt.verify(req.token, 'secretKey')

        if(token) return res.status(200).send(products);

    } catch (err) {} 

    return res.status(403).send(products);


 /*   if(typeof req.cookies.refreshtoken == 'undefined'){
        return res.status(404).send(`No estas logueado... + valor de token ${token}. Valor de req.cookies.refreshtoken ${req.cookies.refreshtoken}`);
    }
    else{
        let token = await jwt.verify(req.token, 'secretKey')

        if(token != req.cookies.refreshtoken){
            return res.status(201).send(`Estas logueado + valor de token ${token}. Valor de req.cookies.refreshtoken ${req.cookies.refreshtoken}` );
        }
        else{
            return res.status(200).send(`Se vencio el token + valor de token ${token}. Valor de req.cookies.refreshtoken ${req.cookies.refreshtoken}`);
        }
    } */

})

function verificarToken(req, res, next){
    if(req.cookies.refreshtoken != undefined && req.headers['authorization'] != undefined){
        const authorization = req.headers['authorization']
    
        let token = authorization.split(' ')[1]
        req.token = token
    }
  
   
    next()
}

module.exports = router;